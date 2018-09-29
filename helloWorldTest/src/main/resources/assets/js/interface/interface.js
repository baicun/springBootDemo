//页面模块名称
var initInterList = {};
var inTerface = {};
inTerface.onOff = true;  //true 降序  false 升序
//添加
inTerface.inputNum = 1;
inTerface.outputNum = 1;
//修改
inTerface.editInNum = 0;
inTerface.editOutNum = 0;
var ifEditName = "";
var ifEditValue = "";

//权限
inTerface.selectAuth = "";
inTerface.updateAuth = "";
inTerface.delAuth = "";

//初始化
inTerface.init = function () {

    //权限
    inTerface.selectAuth = aide.judgeAuth('interfaceManager/selectInterface');
    inTerface.updateAuth = aide.judgeAuth('interfaceManager/updateInterface');
    inTerface.delAuth = aide.judgeAuth('interfaceManager/deleteInterface');

    createPage();
    if (inTerface.selectAuth == ""){
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
    //table排序
    aide.sort({
        id: 'order',
        tabId: 'table_box',
        callBack:function (onOff) {
            inTerface.onOff = onOff;
            createPage();
        }
    });

    //table-移入变色
    aide.tabBackground({
        id: 'table_box'
    });




    //创建时间的点击事件
    // $('#order').off('click').on('click', function () {
    //     console.log("time   time");
    // })

    //新建接口-按钮
    $('#addInterface ,#addInterface1').off('click').on('click', function () {
        aide.layerWhite(); //生成遮罩层
        aide.loaction({ //弹窗位置
            id: 'add_interface',
            top: $(this).offset().top + 58,
            left: $(this).offset().left
        });
        inTerface.initVerify();
        aide.popupOption({
            id: 'add_interface',
            close: function (oDiv) { //关闭
                aide.closeWhiteHide(oDiv);
            },
            sure: function (oDiv) { //确定
                if ($("#form1").valid()) {
                    inTerface.addInter();
                    aide.closeWhiteHide(oDiv);
                }
            },
            cancel: function (oDiv) { //取消
                aide.closeWhiteHide(oDiv);
            }
        });
    })

    //回车搜索
    $("#content").keyup(function(event){
        if(event.keyCode ==13){
            createPage();
        }
    });
}

function createPage() {
    //分页
    aide.page({
        id: 'page',
        onOff: true,
        callBack: function (now, all, sum) {
            console.log('当前页:' + now + ',总共页:' + all + ',总条数:' + sum);
            find(10, now);
            return initInterList;
        }
    });

}

//初始化调用
$(document).ready(inTerface.init);
//新建接口-输入字段
inTerface.addInterface = function (obj) {
    var dataId = $(obj).attr('data-id');
    var oParent = $(obj).parent().parent().parent();
    if (dataId == 1) {
        $(obj).parent().parent().remove();
    } else {
        $(oParent).append(`<li class="inparsExpars_list">
                            <div id="inputDiv">

				<input type="text" placeholder="请输入英文" id= "inparValue${inTerface.inputNum++}" name= "inparValue"/>
				<p class="fields_error fields_error4"></p>
				</div>
				<strong>&#xe638;</strong>
				<input type="text" placeholder="请输入中文" id="inparName${inTerface.inputNum++}" name="inparName"/>
				<p class="fields_error fields_error9"></p>
				<div class="interface_option fl">
				
					<a href="javaScript:;" data-id="0" class="add_interface_fields fl" onclick="inTerface.addInterface($(this))">&#xe61f;</a>
					<a href="javaScript:;" data-id="1" class="del_interface_fields fr" onclick="inTerface.addInterface($(this))">&#xe61d;</a>
				</div>
			</li>
		`)
    }
};
//输出字段
inTerface.addOutInterface = function (obj) {
    var dataId = $(obj).attr('data-id');
    var oParent = $(obj).parent().parent().parent();
    if (dataId == 1) {
        $(obj).parent().parent().remove();
    } else {
        $(oParent).append(`<li class="inparsExpars_list">
                            <div id="inputDiv">

				<input type="text" placeholder="请输入英文" id="exparValue${inTerface.outputNum++}" name="exparValue"/>
				<p class="fields_error fields_error4"></p>
				</div>
				<strong>&#xe638;</strong>
				<input type="text" placeholder="请输入中文" id="exparName${inTerface.outputNum++}" name="exparName"/>
				<p class="fields_error fields_error9"></p>
				<div class="interface_option fl">
				
					<a href="javaScript:;" data-id="0" class="add_interface_fields fl" onclick="inTerface.addOutInterface($(this))">&#xe61f;</a>
					<a href="javaScript:;" data-id="1" class="del_interface_fields fr" onclick="inTerface.addOutInterface($(this))">&#xe61d;</a>
				</div>
			</li>
		`)
    }
}
//查看
inTerface.checkInterface = function (obj) {
    aide.layerBlack(); //生成遮罩层

    var interfaceId = $(obj).parent().parent().find('td:eq(0)').html();
    var interfaceName = $(obj).parent().parent().find('td:eq(1)').html();
    var interfaceLocation = $(obj).parent().parent().find('td:eq(2)').html();

    $.ajax({
        url: url + "/inter/check",
        type: "post",
        data: {id: interfaceId},
        async: true,
        success: function (data) {//回调函数，result，返回值

            var html = `<div class="interface_popup_content">
   		<ul class="interface_list">
   			<li>
   				<strong>接口名称：</strong>
   				<span>${interfaceName}</span>
   			</li>
   			<li>
   				<strong>接口地址：</strong>
   				<span>${interfaceLocation}</span>
   			</li>
   		</ul>
   		<div class="interface_fields_box clear">
   			<div class="interface_fields_left fl">
   				<h2 class="interface_fields_title">输入字段</h2>
   				<ul class="interface_fields_list" id="check_interface_fields1"></ul>
   			</div>
   			<div class="interface_fields_right fl">
   				<h2 class="interface_fields_title">输出字段</h2>
   				<ul class="interface_fields_list" id="check_interface_fields2"></ul>
   			</div>
   		</div>
   	</div>`;
            aide.popupCreate({
                id: 'check_interface',
                title: '查看',
                html: html
            });

            var len1 = data.inparBeanList.length;
            var len2 = data.exparBeanList.length;

            /*for(var i=0;i<len1;i++){
                $('#check_interface_fields1').append(`<li>
                    <span>name</span>
                    <strong>&#xe638;</strong>
                    <span>姓名</span>
                </li>`)
            }*/
            $.each(data.inparBeanList, function (index, item) {
                $('#check_interface_fields1').append(`<li>
					<span>` + item.inparValue + `</span>
					<strong>&#xe638;</strong>
					<span>` + item.inparName + `</span>
		</li>`)
            })

            $.each(data.exparBeanList, function (index, item) {
                $('#check_interface_fields2').append(`<li>
					<span>` + item.exparValue + `</span>
					<strong>&#xe638;</strong>
					<span>` + item.exparName + `</span>
		</li>`)
            })

            /*	for(var i=0;i<len2;i++){
                    $('#check_interface_fields2').append(`<li>
                        <span>verify check</span>
                        <strong>&#xe638;</strong>
                        <span>核验结果</span>
                    </li>`)
                }*/
            $('#check_interface').css('margin-top', -$('#check_interface').height() / 2);
            //关闭确认取消操作
            aide.popupOption({
                id: 'check_interface',
                close: function (oDiv) { //关闭
                    aide.closeBlack(oDiv);
                },
                sure: function (oDiv) { //确定
                    aide.closeBlack(oDiv);
                },
                cancel: function (oDiv) { //取消
                    aide.closeBlack(oDiv);
                }
            });
        },
        error: function () {
        }
    });

};
//修改
inTerface.alterInterface = function (obj) {
    aide.layerBlack(); //生成遮罩层
    var dataState = $(obj).attr('data-state');

    var interfaceId = $(obj).parent().parent().find('td:eq(0)').html();
    var interfaceName = $(obj).parent().parent().find('td:eq(1)').html();
    var interfaceLocation = $(obj).parent().parent().find('td:eq(2)').html();
    ifEditName = interfaceName;
    ifEditValue = interfaceLocation;
    var html;

    $.ajax({
        url: checkInter,
        type: "post",
        data: {id: interfaceId},
        async: true,
        success: function (data) {//回调函数，result，返回值


            if (data.ifUse == 0) {//已被使用
                html = `<div class="interface_popup_content">
        <form id="form2">
            <input type="text" id="id" style="display: none;" value="` + data.id + `">
            <input type="text" id="ifUse" style="display: none;" value="` + data.ifUse + `">
	   		<ul class="interface_list" id="interface_list">
	   			<li>
	   				<strong>接口名称：</strong>
	   				<input type="text" placeholder="请输入接口名称" readonly="readonly" class="interface_active" value="${interfaceName}" id="edit_name" name="edit_name"/>
	   				<i class="popup_error popup_error1"></i>
	   			</li>
	   			<li>
	   				<strong>接口地址：</strong>
	   				<input type="text" placeholder="请输入接口地址" readonly="readonly" class="interface_active" value="${interfaceLocation}" id="edit_value" name="edit_value"/>
	   				<i class="popup_error popup_error1"></i>
	   			</li>
	   		</ul>
	   		<div class="interface_fields_box clear">
	   			<div class="interface_fields_left fl" id="interface_fields_left_edit">
	   				<h2 class="interface_fields_title">输入字段</h2>
	   				<ul class="interface_fields_list" id="check_interface_fields1"></ul>
	   				<p class="interface_title">已被使用的输入字段，无法修改、添加、删除</p>
	   			</div>
	   			<div class="interface_fields_right fl" id="interface_fields_right_edit">
	   				<h2 class="interface_fields_title">输出字段</h2>
	   				<ul class="interface_fields_list" id="check_interface_fields2"></ul>
	   				<p class="interface_title">已被使用的输出字段，只能添加新字段</p>
	   			</div>
	   		</div>
	   		</form>
	   	</div>`;
            } else {
                html = `<div class="interface_popup_content">
        <form id="form2">
            <input type="text" id="id" style="display: none;" value="` + data.id + `">
            <input type="text" id="ifUse" style="display: none;" value="` + data.ifUse + `">
	   		<ul class="interface_list" id="interface_list">
	   			<li>
	   				<strong>接口名称：</strong>
	   				<input type="text" placeholder="请输入接口名称" value="${interfaceName}" id="edit_name" name="edit_name"/>
	   				<i class="popup_error popup_error1"></i>
	   			</li>
	   			<li>
	   				<strong>接口地址：</strong>
	   				<input type="text" placeholder="请输入接口地址" value="${interfaceLocation}" id="edit_value" name="edit_value"/>
	   				<i class="popup_error popup_error1"></i>
	   			</li>
	   		</ul>
	   		<div class="interface_fields_box clear">
	   			<div class="interface_fields_left fl" id="interface_fields_left_edit">
	   				<h2 class="interface_fields_title">输入字段</h2>
	   				<ul class="interface_fields_list" id="check_interface_fields1"></ul>
	   			</div>
	   			<div class="interface_fields_right fl" id="interface_fields_right_edit">
	   				<h2 class="interface_fields_title">输出字段</h2>
	   				<ul class="interface_fields_list" id="check_interface_fields2"></ul>
	   			</div>
	   		</div>
	   		</form>
	   	</div>`;
            }


            aide.popupCreate({
                id: 'alter_interface',
                title: '修改',
                html: html
            });

            var len1 = data.inparBeanList.length;

            var len2 = data.exparBeanList.length;
            if (len1 == 0) {
                if (data.ifUse != 0) {
                    $('#check_interface_fields1').append(`<li class="edit_inpars">
                <div id="inputDivEdit">
				<input type="text" placeholder="请输入英文" id= "editInparValue" name= "editInparValue"/>
				<p class="fields_error fields_error4"></p>
				</div>
				<strong>&#xe638;</strong>
				<input type="text" placeholder="请输入中文" id="editInparName" name="editInparName"/>
				<p class="fields_error fields_error9"></p>
				<div class="interface_option fl">
						<a href="javaScript:;" data-id="0" class="add_interface_fields fl" onclick="inTerface.addCheckInterface($(this))">&#xe61f;</a>
					</div>
			</li>`)
                }
            }
            for (var i = 0; i < len1; i++) {
                if (data.ifUse == 0) {
                    $('#check_interface_fields1').append(`<li class="edit_inpars">
                <div id="inputDivEdit">
				<input type="text" placeholder="请输入英文" readonly="readonly" class="interface_active"  value="` + data.inparBeanList[i].inparValue + `" />
				</div>
				<strong>&#xe638;</strong>
				<input type="text" placeholder="请输入中文" readonly="readonly" class="interface_active" value="` + data.inparBeanList[i].inparName + `" />
			</li>`)
                } else {
                    if (i == 0) {
                        $('#check_interface_fields1').append(`<li class="edit_inpars">
                    <div id="inputDivEdit">
					<input type="text" placeholder="请输入英文" value="` + data.inparBeanList[i].inparValue + `" id= "editInparValue" name= "editInparValue"/>
					<p class="fields_error fields_error4"></p>
				    </div>
					<strong>&#xe638;</strong>
					<input type="text" placeholder="请输入中文" value="` + data.inparBeanList[i].inparName + `" id="editInparName" name="editInparName"/>
					<p class="fields_error fields_error9"></p>
					<div class="interface_option fl">
						<a href="javaScript:;" data-id="0" class="add_interface_fields fl" onclick="inTerface.addCheckInterface($(this))">&#xe61f;</a>
					</div>
				</li>`)
                    } else {
                        $('#check_interface_fields1').append(`<li class="edit_inpars">
					<div id="inputDivEdit">
					<input type="text" placeholder="请输入英文" value="` + data.inparBeanList[i].inparValue + `" id= "editInparValue" name= "editInparValue"/>
					<p class="fields_error fields_error4"></p>
				    </div>
					<strong>&#xe638;</strong>
					<input type="text" placeholder="请输入中文" value="` + data.inparBeanList[i].inparName + `" id="editInparName" name="editInparName"/>
					<p class="fields_error fields_error9"></p>
					<div class="interface_option fl">
						<a href="javaScript:;" data-id="0" class="add_interface_fields fl" onclick="inTerface.addCheckInterface($(this))">&#xe61f;</a>
						<a href="javaScript:;" data-id="1" class="del_interface_fields fr" onclick="inTerface.addCheckInterface($(this))">&#xe61d;</a>
					</div>
				</li>`)
                    }
                }
            }
            // 接口已被使用时编辑输出字段，已被映射的输出字段不可修改删除
            for (var i = 0; i < len2; i++) {
                if (data.ifUse == 0) {
                    if (data.exparBeanList[i].flag == "1") {
                        $('#check_interface_fields2').append(`<li class="edit_expars">
                <div id="inputDivEdit">
				<input type="text" placeholder="请输入英文" readonly="readonly" class="interface_active" value="` + data.exparBeanList[i].exparValue + `" />
				</div>
				<strong>&#xe638;</strong>
				<input type="text" placeholder="请输入中文" readonly="readonly" class="interface_active" value="` + data.exparBeanList[i].exparName + `" />
				<div class="interface_option fl">
					<a href="javaScript:;" data-id="0" class="add_interface_fields fl" onclick="inTerface.addCheckOutInterface($(this))">&#xe61f;</a>
				</div>
			</li>`)
                    } else {
                        if (i == 0) {
                            $('#check_interface_fields2').append(`<li class="edit_expars">
                      <div id="inputDivEdit">
					<input type="text" placeholder="请输入英文" value="` + data.exparBeanList[i].exparValue + `" id="editExparValue" name="editExparValue"/>
					<p class="fields_error fields_error4"></p>
					</div>
					<strong>&#xe638;</strong>
					<input type="text" placeholder="请输入中文" value="` + data.exparBeanList[i].exparName + `" id="editExparName" name="editExparName"/>
					<p class="fields_error fields_error9"></p>
					<div class="interface_option fl">
						<a href="javaScript:;" data-id="0" class="add_interface_fields fl" onclick="inTerface.addCheckOutInterface($(this))">&#xe61f;</a>
					</div>
				</li>`)
                        } else {
                            $('#check_interface_fields2').append(`<li class="edit_expars">
					<div id="inputDivEdit">
					<input type="text" placeholder="请输入英文" value="` + data.exparBeanList[i].exparValue + `" id="editExparValue" name="editExparValue"/>
					<p class="fields_error fields_error4"></p>
					</div>
					<strong>&#xe638;</strong>
					<input type="text" placeholder="请输入中文" value="` + data.exparBeanList[i].exparName + `" id="editExparName" name="editExparName"/>
					<p class="fields_error fields_error9"></p>
					<div class="interface_option fl">
						<a href="javaScript:;" data-id="0" class="add_interface_fields fl" onclick="inTerface.addCheckOutInterface($(this))">&#xe61f;</a>
						<a href="javaScript:;" data-id="1" class="del_interface_fields fr" onclick="inTerface.addCheckOutInterface($(this))">&#xe61d;</a>
					</div>
				</li>`)
                        }
                    }
                } else {
                    if (i == 0) {
                        $('#check_interface_fields2').append(`<li class="edit_expars">
                      <div id="inputDivEdit">
					<input type="text" placeholder="请输入英文" value="` + data.exparBeanList[i].exparValue + `" id="editExparValue" name="editExparValue"/>
					<p class="fields_error fields_error4"></p>
					</div>
					<strong>&#xe638;</strong>
					<input type="text" placeholder="请输入中文" value="` + data.exparBeanList[i].exparName + `" id="editExparName" name="editExparName"/>
					<p class="fields_error fields_error9"></p>
					<div class="interface_option fl">
						<a href="javaScript:;" data-id="0" class="add_interface_fields fl" onclick="inTerface.addCheckOutInterface($(this))">&#xe61f;</a>
					</div>
				</li>`)
                    } else {
                        $('#check_interface_fields2').append(`<li class="edit_expars">
					<div id="inputDivEdit">
					<input type="text" placeholder="请输入英文" value="` + data.exparBeanList[i].exparValue + `" id="editExparValue" name="editExparValue"/>
					<p class="fields_error fields_error4"></p>
					</div>
					<strong>&#xe638;</strong>
					<input type="text" placeholder="请输入中文" value="` + data.exparBeanList[i].exparName + `" id="editExparName" name="editExparName"/>
					<p class="fields_error fields_error9"></p>
					<div class="interface_option fl">
						<a href="javaScript:;" data-id="0" class="add_interface_fields fl" onclick="inTerface.addCheckOutInterface($(this))">&#xe61f;</a>
						<a href="javaScript:;" data-id="1" class="del_interface_fields fr" onclick="inTerface.addCheckOutInterface($(this))">&#xe61d;</a>
					</div>
				</li>`)
                    }
                }
            }
            $('#alter_interface').css('margin-top', -$('#alter_interface').height() / 2);
            inTerface.initVerify1();
            //关闭确认取消操作
            aide.popupOption({
                id: 'alter_interface',
                close: function (oDiv) { //关闭
                    aide.closeBlack(oDiv);
                },
                sure: function (oDiv) { //确定
                    if ($("#form2").valid()) {
                        saveEdit();
                        aide.closeBlack(oDiv);
                    }
                },
                cancel: function (oDiv) { //取消
                    aide.closeBlack(oDiv);
                }
            });
        },
        error: function () {
        }
    });

};

//保存修改
function saveEdit() {
    var inpars = "";
    var expars = "";
    var inparArray = new Array();
    var exparArray = new Array();
    $("#check_interface_fields1 .edit_inpars").each(function () {
        var inparValue = $(this).children("div").children("input").eq(0).val();
        var inparName = $(this).children("input").eq(0).val();
        var inpar = new Object();
        inpar.inparName = inparName;
        inpar.inparValue = inparValue;
        inparArray.push(inpar);
    })
    $("#check_interface_fields2 .edit_expars").each(function () {
        var exparValue = $(this).children("div").children("input").eq(0).val();
        var exparName = $(this).children("input").eq(0).val();
        var expar = new Object();
        expar.exparName = exparName;
        expar.exparValue = exparValue;
        exparArray.push(expar);
    })

    $.ajax({
        url: edit,
        type: "post",
        data: {
            "param": JSON.stringify({
                "id": $("#id").val(),
                "ifUse": $("#ifUse").val(),
                "name": $.trim($("#edit_name").val()),
                "address": $("#edit_value").val(),
                "inparString": JSON.stringify(inparArray),
                "exparString": JSON.stringify(exparArray)
            })
        },
        async: true,
        success: function (data) {//回调函数，result，返回值
            if (data == 1) {
                window.location.reload();
            } else {
                aide.alert("修改接口信息失败");
            }
        },
        error: function () {
            aide.alert("修改接口信息异常");
        }
    });
    /*$(".revisePop").hide();*/
}

//修改-输入字段
inTerface.addCheckInterface = function (obj) {
    var dataId = $(obj).attr('data-id');
    var oParent = $(obj).parent().parent().parent();
    if (dataId == 1) {
        $(obj).parent().parent().remove();
    } else {
        $(oParent).append(`<li class="edit_inpars">
            <div id="inputDivEdit">
			<input type="text" placeholder="请输入英文" id= "editInparValue" name= "editInparValue"/>
			<p class="fields_error fields_error4"></p>
			</div>
			<strong>&#xe638;</strong>
			<input type="text" placeholder="请输入中文" id="editInparName" name="editInparName"/>
			<p class="fields_error fields_error9"></p>
    		<div class="interface_option fl">
    			<a href="javaScript:;" data-id="0" class="add_interface_fields fl" onclick="inTerface.addCheckInterface($(this))">&#xe61f;</a>
    			<a href="javaScript:;" data-id="1" class="del_interface_fields fr" onclick="inTerface.addCheckInterface($(this))">&#xe61d;</a>
    		</div>
    	</li>
    `)
    }
    $('#alter_interface').css('margin-top', -$('#alter_interface').height() / 2);
};
//修改-输出字段
inTerface.addCheckOutInterface = function (obj) {
    var dataId = $(obj).attr('data-id');
    var oParent = $(obj).parent().parent().parent();
    if (dataId == 1) {
        $(obj).parent().parent().remove();
    } else {
        $(oParent).append(`<li class="edit_expars">
    		<div id="inputDivEdit">
					<input type="text" placeholder="请输入英文" id="editExparValue" name="editExparValue"/>
					<p class="fields_error fields_error4"></p>
					</div>
					<strong>&#xe638;</strong>
					<input type="text" placeholder="请输入中文" id="editExparName" name="editExparName"/>
					<p class="fields_error fields_error9"></p>
    		<div class="interface_option fl">
    			<a href="javaScript:;" data-id="0" class="add_interface_fields fl" onclick="inTerface.addCheckOutInterface($(this))">&#xe61f;</a>
    			<a href="javaScript:;" data-id="1" class="del_interface_fields fr" onclick="inTerface.addCheckOutInterface($(this))">&#xe61d;</a>
    		</div>
    	</li>
    `)
    }
    $('#alter_interface').css('margin-top', -$('#alter_interface').height() / 2);
};

//删除操作
inTerface.deleteData = function (obj) {
    var index = $(obj).parent().parent().index();

    var id = $(obj).parent().parent().find('td:eq(0)').html();
    var interfaceName = $(obj).parent().parent().find('td:eq(1)').html();

    console.log(id);
    aide.layerBlack(); //生成遮罩层
    //生成
    var message = '是否要删除接口';
    var info = interfaceName;
    var html = `<p class="popup_text">${message}<span>${info}</span>？</p>`
    aide.popupCreate({
        id: 'delete_popup',
        html: html
    });
    //关闭确认取消操作
    aide.popupOption({
        id: 'delete_popup',
        close: function (oDiv) { //关闭
            aide.closeBlack(oDiv);
        },
        sure: function (oDiv) { //确定
            /*$(obj).parent().parent().remove();*/
            toDel(id);
            aide.closeBlack(oDiv);
        },
        cancel: function (oDiv) { //取消
            aide.closeBlack(oDiv);
        }
    });
};

//删除接口
function toDel(id) {
    $.ajax({
        url: url + "/inter/del",
        type: "post",
        data: {"id": id},
        async: true,
        success: function (data) {//回调函数，result，返回值
            if (data == 1) {
                window.location.reload();
            } else {
            }
        },
        error: function () {
        }
    });
}

function find(pageSize, pageNow) {
    $.ajax({
        url: url + "/inter/findAll",
        type: "post",
        data: {
            "pageSize": pageSize,
            /*"pageNum":$("#pageNum").val(),*/
            "search": $("#content").val(),
            "startDate": $("#startDate").val(),
            "endDate": $("#endDate").val(),
            "pageNum": pageNow,
            "sort": "creat_time",
            "order" : inTerface.onOff ? "desc" : "asc",  //时间排序 默认降序
        },
        dataType: "json",
        async: false,
        success: function (data) {//回调函数，result，返回值
            if (data.list.length == 0 && pageNow == 1){
                $("#list").html('');
                $(".page_parent").hide();
                $(".no_info").show();
            }else {
                $(".no_info").hide();
                initInterList = data;
                $("#list").html(createTable(data.list));
                $(".page_parent").show();
            }
        },
        error: function () {
            aide.alert("获取数据异常");
        }
    });
    //删除提示层
    aide.tipLayer({
        id: 'delete_hint',
        oClass: '.delete_option',
        iText: '接口已使用时，无法删除，如需删除请先去除相应字段调用该接口。',
        left: 174,
        top: 70
    });
}

function createTable(data) {
    var html = "";



    for (var i = 0; i < data.length; i++) {
        var name = aide.notNull(data[i].name);
        var address = aide.notNull(data[i].address);
        var inparTotal = aide.notNull(data[i].inparTotal);
        var exparTotal = aide.notNull(data[i].exparTotal);
        var createTime = aide.notNullOfDateTime(data[i].creatTime);

        html += "<tr data-time=" + data[i].creatTime.substring(0, 10) + ">";
        html += "<td type='text' id='inter_id' style='display: none;'>" + data[i].id + "</td>";
        //接口名称
        html += "<td class='table_padding' title="+ name +">" + name + "</td>";
        //接口地址
        html += "<td>" + address + "</td>";
        //输入字段
        html += "<td>" + inparTotal + "</td>";
        //输出字段
        html += "<td>" + exparTotal + "</td>";
        //创建时间
        html += "<td>" + createTime + "</td>";
        //操作
        html += "<td class='options'>";
        html += "<a href='javaScript:;' class='check_option option_left1'  title='查看' onclick='inTerface.checkInterface($(this))'"+ inTerface.selectAuth +">查看</a>";
        html += "<a href='javaScript:;' class='check_option option_left2' title='修改'  onclick='inTerface.alterInterface($(this))'"+ inTerface.updateAuth +">修改</a>";
        if (data[i].ifUse == 0) {
            html += "<a href='javaScript:;' class='check_option option_left3 delete_option' data-id='0'"+ inTerface.delAuth +"><span>删除</span></a>";
        } else {
            html += "<a href='javaScript:;' class='check_option option_left3' title='删除' onclick='inTerface.deleteData($(this))'"+ inTerface.delAuth +">删除</a>";
        }
        //html +="<a href='javaScript:;' class='delete' title='删除' onClick='delField("+data[i].id+")'>删除</a>";
        //<a href="javaScript:;" hint="接口已使用时，无法删除，如需删除请先去除相应字段调用该接口" class="no-delete icon_hint">删除</a>
        html += "</td>";
        html += "</tr>";
    }
    return html;
}


//新增接口
inTerface.addInter = function () {
    var inpars = "";
    var expars = "";
    var inparArray = new Array();
    var exparArray = new Array();
    $("#interface_fields1 .inparsExpars_list").each(function () {
        var inparValue = $(this).children("div").children("input").eq(0).val();
        var inparName = $(this).children("input").eq(0).val();

        var inpar = new Object();
        inpar.inparName = inparName;
        inpar.inparValue = inparValue;
        inparArray.push(inpar);
    })
    $("#interface_fields2 .inparsExpars_list").each(function () {
        var exparValue = $(this).children("div").children("input").eq(0).val();
        var exparName = $(this).children("input").eq(0).val();
        var expar = new Object();
        expar.exparName = exparName;
        expar.exparValue = exparValue;
        exparArray.push(expar);
    })


    $.ajax({
        url: url + "/inter/add",
        type: "post",
        data: {
            "param": JSON.stringify({
                "name": $.trim($("#interName").val()),
                "address": $("#address").val(),
                "inparString": JSON.stringify(inparArray),
                "exparString": JSON.stringify(exparArray)
            })
        },
        async: true,
        success: function (data) {//回调函数，result，返回值
            if (data == 1) {
                window.location.reload();
            } else {
                aide.alert("新增接口失败");
            }
        },
        error: function () {
            aide.alert("新增接口异常");
        }
    });
}

//查询
inTerface.search = function () {
    createPage();
}
inTerface.initVerify1 = function () {
    //修改
    //接口名称唯一
    $.validator.addMethod("interNameOnly",
        function (value, element) {
            var onlyFlag = false;
            $.ajax({
                url: interCheckName,
                type: "post",
                data: {"name": $("#edit_name").val()},
                async: false,
                success: function (data) {//回调函数，result，返回值
                    if (data == 0) {
                        onlyFlag = true;
                    }
                    if (ifEditName == $("#edit_name").val()) {
                        if (data == 1) {
                            onlyFlag = true;
                        }
                    }
                },
                error: function () {
                    onlyFlag = true;
                    aide.alert("异常");
                }
            });
            return onlyFlag;
        },
        "接口名称已存在");

    //出参英文字段是否重复
    $.validator.addMethod("exparValueOnly",
        function (value, element) {
            var onlyFlag = true;
            var exparArray = new Array();
            $("#check_interface_fields2 .edit_expars").each(function () {
                var exparValue = $(this).children("div").children("input").eq(0).val();
                if (!$.isEmptyObject(exparValue)) {
                    exparArray.push(exparValue);
                }
            })
            var nary = exparArray.sort();
            for (var i = 0; i < nary.length - 1; i++) {
                if (nary[i] == nary[i + 1]) {
                    onlyFlag = false;
                }
            }
            return onlyFlag;
        },
        "出参英文字段重复");

    //出参中文字段是否重复
    $.validator.addMethod("exparNameOnly",
        function (value, element) {
            var onlyFlag = true;
            var exparArray = new Array();
            $("#check_interface_fields2 .edit_expars").each(function () {
                var exparName = $(this).children("input").eq(0).val();
                if (!$.isEmptyObject(exparName)) {
                    exparArray.push(exparName);
                }
            })
            var nary = exparArray.sort();
            for (var i = 0; i < nary.length - 1; i++) {
                if (nary[i] == nary[i + 1]) {
                    onlyFlag = false;
                }
            }
            return onlyFlag;
        },
        "出参中文字段重复");
    //检查是否写全映射关系
    $.validator.addMethod("checkRepeat",
        function (value, element) {
            var onlyFlag = true;
            var exparArray = new Array();
            var exparArray1 = new Array();
            $("#check_interface_fields2 .edit_expars").each(function () {
                var exparName = $(this).children("input").eq(0).val();
                var exparValue = $(this).children("div").children("input").eq(0).val();
                if (($.isEmptyObject(exparName) && !$.isEmptyObject(exparValue)) || (!$.isEmptyObject(exparName) && $.isEmptyObject(exparValue))) {
                    return false;
                }
                if (!$.isEmptyObject(exparName)) {
                    exparArray.push(exparName);
                }
                if (!$.isEmptyObject(exparValue)) {
                    exparArray1.push(exparValue);
                }
            })
            if (exparArray.length != exparArray1.length) {
                onlyFlag = false;
            }
            return onlyFlag;
        },
        "请写全出参映射");
    //检查是否写全入参映射关系
    $.validator.addMethod("checkInpar",
        function (value, element) {
            var onlyFlag = true;
            var inparArray = new Array();
            var inparArray1 = new Array();
            $("#check_interface_fields1 .edit_inpars").each(function () {
                var inparValue = $(this).children("div").children("input").eq(0).val();
                var inparName = $(this).children("input").eq(0).val();
                if (!$.isEmptyObject(inparName)) {
                    inparArray.push(inparName);
                }
                if (!$.isEmptyObject(inparValue)) {
                    inparArray1.push(inparValue);
                }
            })
            if (inparArray.length != inparArray1.length) {
                onlyFlag = false;
            }
            return onlyFlag;
        },
        "请写全入参映射");
    //人参中文字段是否重复
    $.validator.addMethod("editInparNameOnly",
        function (value, element) {
            var onlyFlag = true;
            var inparArray = new Array();
            $("#check_interface_fields1 .edit_inpars").each(function () {
                var inparName = $(this).children("input").eq(0).val();
                if (!$.isEmptyObject(inparName)) {
                    inparArray.push(inparName);
                }
            })
            var nary = inparArray.sort();
            for (var i = 0; i < nary.length - 1; i++) {
                if (nary[i] == nary[i + 1]) {
                    onlyFlag = false;
                }
            }
            return onlyFlag;
        },
        "入参中文字段重复");

    //人参英文字段是否重复
    $.validator.addMethod("editInparValueOnly",
        function (value, element) {
            var onlyFlag = true;
            var inparArray = new Array();
            $("#check_interface_fields1 .edit_inpars").each(function () {
                var inparValue = $(this).children("div").children("input").eq(0).val();
                if (!$.isEmptyObject(inparValue)) {
                    inparArray.push(inparValue);
                }
            })
            var nary = inparArray.sort();
            for (var i = 0; i < nary.length - 1; i++) {
                if (nary[i] == nary[i + 1]) {
                    onlyFlag = false;
                }
            }
            return onlyFlag;
        },
        "入参英文字段重复");

    //接口地址唯一
    $.validator.addMethod("addressOnly",
        function (value, element) {
            var onlyFlag = false;
            $.ajax({
                url: interCheckAddress,
                type: "post",
                data: {"address": $("#edit_value").val()},
                async: false,
                success: function (data) {//回调函数，result，返回值
                    if (data == 0) {
                        onlyFlag = true;
                    }
                    if (ifEditValue == $("#edit_value").val()) {
                        if (data == 1) {
                            onlyFlag = true;
                        }
                    }
                },
                error: function () {
                    onlyFlag = true;
                    aide.alert("异常");
                }
            });
            return onlyFlag;
        },
        "接口地址已存在");

    //接口地址以http:\\或https:\\开头
    $.validator.addMethod("httpsCheck",
        function (value, element) {
            var onlyFlag = true;
            var editValue = $("#edit_value").val();
            var patrn = /^(http:\/\/)/i;
            var patrn1 = /^(https:\/\/)/i;
            if (!patrn.exec(editValue) && !patrn1.exec(editValue)) {
                onlyFlag = false;
            }
            return onlyFlag;
        },
        "接口地址请以http://或https://开头");

    //接口地址是否有汉字
    $.validator.addMethod("chinesCheck",
        function (value, element) {
            var onlyFlag = true;
            var editValue = $("#edit_value").val();
            var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g")
            if (reg.test(editValue)) {
                onlyFlag = false;
            }
            return onlyFlag;
        },
        "接口地址中不能有汉字");

    //出参英文字段是否合规
    $.validator.addMethod("exparFormat",
        function (value, element) {
            var onlyFlag = true;
            var reg = /^[a-zA-Z]\w{0,29}$/;
            var exparArray = new Array();
            $("#check_interface_fields2 .edit_expars").each(function () {
                var exparValue = $(this).children("div").children("input").eq(0).val();
                if (!$.isEmptyObject(exparValue)) {
                    exparArray.push(exparValue);
                }
            })
            for (var i = 0; i < exparArray.length; i++) {
                if (!reg.test(exparArray[i])) {
                    onlyFlag = false;
                    break;
                }
            }

            return onlyFlag;
        },
        "请输入合规英文字段");
    //入参英文字段是否合规
    $.validator.addMethod("inparFormat",
        function (value, element) {
            var onlyFlag = true;
            var reg = /^[a-zA-Z]\w{0,29}$/;
            var inparArray = new Array();
            $("#check_interface_fields1 .edit_inpars").each(function () {
                var inparValue = $(this).children("div").children("input").eq(0).val();
                if (!$.isEmptyObject(inparValue)) {
                    inparArray.push(inparValue);
                }
            })
            for (var i = 0; i < inparArray.length; i++) {
                if (!reg.test(inparArray[i])) {
                    onlyFlag = false;
                    break;
                }
            }
            return onlyFlag;
        },
        "请输入合规英文字段");

    inTerface.validateMethod();

    $("#form2").validate({
        onkeyup: false,
        rules: {
            edit_name: {
                required: true,
                isStandard: true,
                maxlength: 20,
                interNameOnly: true
            },
            edit_value: {
                required: true,
                addressOnly: true,
                httpsCheck: true,
                chinesCheck: true
            },
            editExparValue: {
                required: true,
                maxlength: 20,
                exparValueOnly: true,
                exparFormat: true
            },
            editExparName: {
                required: true,
                isChinese: true,
                maxlength: 10,
                exparNameOnly: true,
                checkRepeat: true
            },
            editInparName: {
                checkInpar: true,
                isChinese: true,
                maxlength: 10,
                editInparNameOnly: true
            },
            editInparValue: {
                maxlength: 20,
                editInparValueOnly: true,
                inparFormat: true
            }
        },
        messages: {
            edit_name: {
                required: "请输入接口名称",
                maxlength: "长度不能超过20",
                interNameOnly: "接口名称已存在"
            },
            edit_value: {
                required: "请输入接口地址",
                addressOnly: "接口地址已存在",
                httpsCheck: "接口地址请以http://或https://开头",
                chinesCheck: "接口地址中不能有汉字"
            },
            editExparValue: {
                required: "请输入英文字段",
                maxlength: "长度不能超过20",
                exparValueOnly: "出参英文重复",
                exparFormat: "请输入合规英文字段"
            },
            editExparName: {
                required: "请输入中文字段",
                maxlength: "长度不能超过10",
                exparNameOnly: "出参中文重复",
                checkRepeat: "请写全出参映射"
            },
            editInparName: {
                checkInpar: "请写全入参映射",
                maxlength: "长度不能超过10",
                editInparNameOnly: "入参中文重复"
            },
            editInparValue: {
                maxlength: "长度不能超过20",
                editInparValueOnly: "入参英文重复",
                inparFormat: "请输入合规英文字段"
            }
        },
        errorPlacement: function (error, element) {
            if ($(element).parent().parent().attr("id") == "interface_list") {

                $(element).parent().find(".popup_error1").html(error).show();
            } else {
                if ($(element).parent().attr("id") == "inputDivEdit") {
                    $(element).parent().find(".fields_error4").html(error).show();
                } else {
                    $(element).parent().find(".fields_error9").html(error).show();
                }
            }
        },
        highlight: function (element, errorClass, validClass) { // element出错时触发
            if ($(element).parent().parent().attr("id") == "interface_list") {
                $(element).addClass('active');
            } else {
                $(element).addClass("fields_error_acitve");
            }
        },
        unhighlight: function (element, errorClass, validClass) {
            if ($(element).parent().parent().attr("id") == "interface_list") {
                $(element).removeClass('active');
            } else {
                $(element).removeClass("fields_error_acitve");
            }
        }
    });
}

inTerface.initVerify = function () {
    //接口名称唯一
    $.validator.addMethod("interNameOnly",
        function (value, element) {
            /* var intername = $("#interName").html();
             alert(intername);*/
            var onlyFlag = false;
            $.ajax({
                url: interCheckName,
                type: "post",
                data: {"name": $("#interName").val()},
                async: false,
                success: function (data) {//回调函数，result，返回值
                    if (data == 0) onlyFlag = true;
                },
                error: function () {
                    onlyFlag = true;
                    aide.alert("异常");
                }
            });
            return onlyFlag;
        },
        "接口名称已存在");

    //出参英文字段是否重复
    $.validator.addMethod("exparValueOnly",
        function (value, element) {
            var onlyFlag = true;
            var exparArray = new Array();
            $("#interface_fields2 .inparsExpars_list").each(function () {
                var exparValue = $(this).children("div").children("input").eq(0).val();
                if (!$.isEmptyObject(exparValue)) {
                    exparArray.push(exparValue);
                }
            })
            var nary = exparArray.sort();
            for (var i = 0; i < nary.length - 1; i++) {
                if (nary[i] == nary[i + 1]) {
                    onlyFlag = false;
                }
            }
            return onlyFlag;
        },
        "出参英文字段重复");

    //出参中文字段是否重复
    $.validator.addMethod("exparNameOnly",
        function (value, element) {
            var onlyFlag = true;
            var exparArray = new Array();
            $("#interface_fields2 .inparsExpars_list").each(function () {
                var exparName = $(this).children("input").eq(0).val();
                if (!$.isEmptyObject(exparName)) {
                    exparArray.push(exparName);
                }
            })
            var nary = exparArray.sort();
            for (var i = 0; i < nary.length - 1; i++) {
                if (nary[i] == nary[i + 1]) {
                    onlyFlag = false;
                }
            }
            return onlyFlag;
        },
        "出参中文字段重复");
    //检查是否写全映射关系
    $.validator.addMethod("checkRepeat",
        function (value, element) {
            var onlyFlag = true;
            var exparArray = new Array();
            var exparArray1 = new Array();
            $("#interface_fields2 .inparsExpars_list").each(function () {
                var exparName = $(this).children("input").eq(0).val();
                var exparValue = $(this).children("div").children("input").eq(0).val();
                if (($.isEmptyObject(exparName) && !$.isEmptyObject(exparValue)) || (!$.isEmptyObject(exparName) && $.isEmptyObject(exparValue))) {
                    return false;
                }
                if (!$.isEmptyObject(exparName)) {
                    exparArray.push(exparName);
                }
                if (!$.isEmptyObject(exparValue)) {
                    exparArray1.push(exparValue);
                }
            })
            if (exparArray.length != exparArray1.length) {
                onlyFlag = false;
            }
            return onlyFlag;
        },
        "请写全出参映射");
    //检查是否写全入参映射关系
    $.validator.addMethod("checkInpar",
        function (value, element) {
            var onlyFlag = true;
            var inparArray = new Array();
            var inparArray1 = new Array();
            $("#interface_fields1 .inparsExpars_list").each(function () {
                var inparValue = $(this).children("div").children("input").eq(0).val();
                var inparName = $(this).children("input").eq(0).val();
                if (!$.isEmptyObject(inparName)) {
                    inparArray.push(inparName);
                }
                if (!$.isEmptyObject(inparValue)) {
                    inparArray1.push(inparValue);
                }
            })
            if (inparArray.length != inparArray1.length) {
                onlyFlag = false;
            }
            return onlyFlag;
        },
        "请写全入参映射");

    //人参中文字段是否重复
    $.validator.addMethod("inparNameOnly",
        function (value, element) {
            var onlyFlag = true;
            var inparArray = new Array();
            $("#interface_fields1 .inparsExpars_list").each(function () {
                var inparName = $(this).children("input").eq(0).val();
                if (!$.isEmptyObject(inparName)) {
                    inparArray.push(inparName);
                }
            })
            var nary = inparArray.sort();
            for (var i = 0; i < nary.length - 1; i++) {
                if (nary[i] == nary[i + 1]) {
                    onlyFlag = false;
                }
            }
            return onlyFlag;
        },
        "入参中文字段重复");

    //人参英文字段是否重复
    $.validator.addMethod("inparValueOnly",
        function (value, element) {
            var onlyFlag = true;
            var inparArray = new Array();
            $("#interface_fields1 .inparsExpars_list").each(function () {
                var inparValue = $(this).children("div").children("input").eq(0).val();
                if (!$.isEmptyObject(inparValue)) {
                    inparArray.push(inparValue);
                }
            })
            var nary = inparArray.sort();
            for (var i = 0; i < nary.length - 1; i++) {
                if (nary[i] == nary[i + 1]) {
                    onlyFlag = false;
                }
            }
            return onlyFlag;
        },
        "入参英文字段重复");

    //接口地址唯一
    $.validator.addMethod("addressOnly",
        function (value, element) {
            var onlyFlag = false;
            $.ajax({
                url: interCheckAddress,
                type: "post",
                data: {"address": $("#address").val()},
                async: false,
                success: function (data) {//回调函数，result，返回值
                    if (data == 0) {
                        onlyFlag = true;
                    }
                },
                error: function () {
                    onlyFlag = true;
                    aide.alert("异常");
                }
            });
            return onlyFlag;
        },
        "接口地址已存在");

    //接口地址以http:\\或https:\\开头
    $.validator.addMethod("httpsCheck",
        function (value, element) {
            var onlyFlag = true;
            var editValue = $("#address").val();
            var patrn = /^(http:\/\/)/i;
            var patrn1 = /^(https:\/\/)/i;
            if (!patrn.exec(editValue) && !patrn1.exec(editValue)) {
                onlyFlag = false;
            }
            return onlyFlag;
        },
        "接口地址请以http://或https://开头");

    //接口地址是否有汉字
    $.validator.addMethod("chinesCheck",
        function (value, element) {
            var onlyFlag = true;
            var editValue = $("#address").val();
            var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g")
            if (reg.test(editValue)) {
                onlyFlag = false;
            }
            return onlyFlag;
        },
        "接口地址中不能有汉字");

    //出参英文字段是否合规
    $.validator.addMethod("exparFormat",
        function (value, element) {
            var onlyFlag = true;
            var reg = /^[a-zA-Z]\w{0,29}$/;
            var exparArray = new Array();
            $("#interface_fields2 .inparsExpars_list").each(function () {
                var exparValue = $(this).children("div").children("input").eq(0).val();
                if (!$.isEmptyObject(exparValue)) {
                    exparArray.push(exparValue)
                }
            })
            for (var i = 0; i < exparArray.length; i++) {
                if (!reg.test(exparArray[i])) {
                    onlyFlag = false;
                    break;
                }
            }
            return onlyFlag;
        },
        "请输入合规英文字段");
    //入参英文字段是否合规
    $.validator.addMethod("inparFormat",
        function (value, element) {
            var onlyFlag = true;
            var reg = /^[a-zA-Z]\w{0,29}$/;
            var inparArray = new Array();
            $("#interface_fields1 .inparsExpars_list").each(function () {
                var inparValue = $(this).children("div").children("input").eq(0).val();
                if (!$.isEmptyObject(inparValue)) {
                    inparArray.push(inparValue)
                }
            })
            for (var i = 0; i < inparArray.length; i++) {
                if (!reg.test(inparArray[i])) {
                    onlyFlag = false;
                    break;
                }
            }
            return onlyFlag;
        },
        "请输入合规英文字段");

    inTerface.validateMethod();

    $("#form1").validate({
        onkeyup: false,
        rules: {
            interName: {
                required: true,
                isStandard: true,
                maxlength: 20,
                interNameOnly: true
            },
            address: {
                required: true,
                addressOnly: true,
                httpsCheck: true,
                chinesCheck: true
            },
            exparValue: {
                required: true,
                maxlength: 20,
                exparValueOnly: true,
                exparFormat: true
            },
            exparName: {
                required: true,
                isChinese: true,
                maxlength: 10,
                exparNameOnly: true,
                checkRepeat: true
            },
            inparName: {
                checkInpar: true,
                isChinese: true,
                maxlength: 10,
                inparNameOnly: true
            },
            inparValue: {
                maxlength: 20,
                inparValueOnly: true,
                inparFormat: true
            }
        },
        messages: {
            interName: {
                required: "请输入接口名称",
                maxlength: "长度不能超过20",
                interNameOnly: "接口名称已存在"
            },
            address: {
                required: "请输入接口地址",
                addressOnly: "接口地址已存在",
                httpsCheck: "接口地址请以http://或https://开头",
                chinesCheck: "接口地址中不能有汉字"
            },
            exparValue: {
                required: "请输入英文字段",
                maxlength: "长度不能超过20",
                exparValueOnly: "出参英文重复",
                exparFormat: "请输入合规英文字段"
            },
            exparName: {
                required: "请输入中文字段",
                maxlength: "长度不能超过10",
                exparNameOnly: "出参中文重复",
                checkRepeat: "请写全出参映射"
            },
            inparName: {
                checkInpar: "请写全入参映射",
                maxlength: "长度不能超过10",
                inparNameOnly: "入参中文重复"
            },
            inparValue: {
                maxlength: "长度不能超过20",
                inparValueOnly: "入参英文重复",
                inparFormat: "请输入合规英文字段"
            }
        },
        errorPlacement: function (error, element) {
            if ($(element).parent().parent().attr("id") == "interface_list") {

                $(element).parent().find(".popup_error1").html(error).show();
            } else {
                if ($(element).parent().attr("id") == "inputDiv") {
                    $(element).parent().find(".fields_error4").html(error).show();
                } else {
                    $(element).parent().find(".fields_error9").html(error).show();
                }
            }
        },
        highlight: function (element, errorClass, validClass) { // element出错时触发
            if ($(element).parent().parent().attr("id") == "interface_list") {
                $(element).addClass('active');
            } else {
                $(element).addClass("fields_error_acitve");
            }
        },
        unhighlight: function (element, errorClass, validClass) {
            if ($(element).parent().parent().attr("id") == "interface_list") {
                $(element).removeClass('active');
            } else {
                $(element).removeClass("fields_error_acitve");
            }

        }
    });
}

//通用校验
inTerface.validateMethod = function () {

    $.validator.addMethod("isStandard", function (value, element) {
        var standard1 = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
        return standard1.test(value);
    }, "只能输入汉字/英文/数字");

    $.validator.addMethod("isChinese", function (value, element) {
        var reg = /^[\u4e00-\u9fa5]+$/;
        return this.optional(element) || reg.test(value);
    }, "请输入中文字段");
}








