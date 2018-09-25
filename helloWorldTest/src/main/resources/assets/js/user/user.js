//页面模块名称
var user = {};
user.resultdata = {};
user.nowpage = 1;
user.roleList = [];
user.status = null;
user.roleId = null;

//初始化
user.inif = function () {

    //初始化页面数据
    user.roleInfo();
    user.createPage();

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
                user.createPage();
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
                user.createPage();
            }
        }
    });
    //table-下拉菜单-状态
    aide.downMenu({
        id: 'down_menu1',
        data: [{'dataId': '0', 'name': '全部'},
            {'dataId': '1', 'name': '使用中'},
            {'dataId': '2', 'name': '冻结'},
            {'dataId': '3', 'name': '注销'},
            // {'dataId': '4', 'name': '锁定'}
        ],
        callBack: function (obj, index) {
            if (index == 0) {
                user.status = null;
            } else {
                user.status = index - 1;
            }
            user.createPage();
        }
    });
    //table-下拉菜单-角色
    aide.downMenu({
        id: 'down_menu2',
        data: [{"dataId": '0', "name": "全部"}].concat(user.roleList),
        callBack: function (obj, index) {
            var roleId = $(obj).attr('data-id');
            if (roleId == 0) {
                user.roleId = null;
            } else {
                user.roleId = roleId;
            }
            user.createPage();
        }
    });
    //新增用户-角色
    aide.downMenu({
        id: 'menu_box1',
        onOff: true,
        Iindex: 0,
        data: [{"dataId": '0', "name": "请选择"}].concat(user.roleList),
        callBack: function (obj, index) {
            if (index == 0) {
                $("#rolediv").parent().parent().find(".popup_error").html("请选择角色类型").show();
                $("#rolediv").addClass("down_menu_active1");
            } else {
                $("#rolediv").parent().parent().find(".popup_error").html("").show();
                $("#rolediv").removeClass("down_menu_active1");
            }
        }
    });

    //table-移入变色
    aide.tabBackground({
        id: 'table_box'
    })
    //新增用户
    $('#add_user ,#add_user1').off('click').on('click', function () {
        aide.layerBlack(); //生成遮罩层
        aide.popupOption({
            id: 'addUser_popup',
            close: function (oDiv) { //关闭
                aide.closeBlackHide(oDiv);
            },
            sure: function (oDiv) { //确定
                if ($("#userSaveForm").valid()) {
                    aide.closeBlackHide(oDiv);
                    user.addUser();
                }
            },
            cancel: function (oDiv) { //取消
                aide.closeBlackHide(oDiv);
            }
        });

    });
    user.initVerify();

    //回车搜索
    $("#searchContent").keyup(function(event){
        if(event.keyCode ==13){
            user.createPage();
        }
    });
}
//初始化调用
$(document).ready(user.inif);

user.createPage = function () {
    //分页
    aide.page({
        id: 'page',
        onOff: true,
        callBack: function (now, all, sum) {
            user.selectUserList(now);
            return user.resultdata;
        }
    })
}

//获取角色列表
user.roleInfo = function () {
    $.ajax({
        url: findAllRoleInfo,
        type: "get",
        async: false,
        success: function (data) {//回调函数，result，返回值
            user.roleList = JSON.parse(data);
        },
        error: function (data) {
            aide.alert("获取数据异常");
        }
    });
}
//搜索
user.searchUser = function () {
    user.createPage();
}
//用户列表
user.selectUserList = function (nowPage) {
    user.nowpage = nowPage;
    $.ajax({
        url: userList,
        type: "get",
        data: {
            "pageSize": 10,
            "pageNum": nowPage,
            "status": user.status,
            "roleId": user.roleId,
            startDate: $("#startDate").val(),//开始时间
            endDate: $("#endDate").val(),//结束时间
            searchContent: $("#searchContent").val()//模糊检索条件
        },
        dataType: "json",
        async: false,
        success: function (data) {//回调函数，result，返回值
            if (data.list.length == 0 && nowPage == 1){
                $("#tbody_box").html('');
                $(".page_parent").hide();
                $(".no_info").show();
            }else {
                $(".no_info").hide();
                user.resultdata = data;
                $("#tbody_box").html(user.createTable(data.list));
                $(".page_parent").show();
            }
        },
        error: function (data) {
            aide.alert("获取数据异常");
        }
    });
}
//创建列表
user.createTable = function (data) {
    var htmlContent = "";
    //权限
    var updateuAuth = aide.judgeAuth('userManager/update');
    var freezeAuth = aide.judgeAuth('userManager/freeze');
    var writeoffAuth = aide.judgeAuth('userManager/writeoff');
    var resetPwdAuth = aide.judgeAuth('userManager/resetpwd');
    var deleteAuth = aide.judgeAuth('userManager/delete');


    for (var i = 0; i < data.length; i++) {
        htmlContent += "<tr>";
        var uname = aide.notNull(data[i].account);
        var name = aide.notNull(data[i].name);
        var mobile = aide.notNull(data[i].phone);
        var email = aide.notNull(data[i].email);
        var statusDec = data[i].status == 0 ? data[i].status : aide.notNull(data[i].status);
        var creator = aide.notNull(data[i].creator);
        var createTime = aide.notNullOfDate(data[i].createTime, true);
        var lastLoginTime = aide.notNullOfDate(data[i].lastLoginTime, true);
        var isUser = data[i].isUser;

        htmlContent += "<td class='table_padding' title="+ uname +">" + uname + "</td>";
        htmlContent += "<td title="+ name +">" + name + "</td>";
        htmlContent += "<td>" + mobile + "</td>";
        htmlContent += "<td>" + email + "</td>";
        htmlContent += "<td title="+ data[i].roleName +">" + data[i].roleName + "</td>";
        if (statusDec == 0) {
            htmlContent += "<td class='state_dot state_dot1'><span></span><span>使用中</span></td>";
        } else if (statusDec == 1) {
            htmlContent += "<td class='state_dot state_dot2'><span></span><span>冻结</span></td>";
        } else if (statusDec == 2) {
            htmlContent += "<td class='state_dot state_dot3'><span></span><span>注销</span></td>";
        } else if (statusDec == 3) {
            htmlContent += "<td class='state_dot state_dot3'><span></span>锁定</td>";
        } else {
            htmlContent += "<td class='state_dot state_dot3'><span></span>-</td>";
        }

        htmlContent += "<td>" + creator + "</td>";
        htmlContent += "<td>" + createTime + "</td>";
        htmlContent += "<td>" + lastLoginTime + "</td>";

        //操作
        htmlContent += "<td class='options'>"
        if (statusDec == 2) {
            htmlContent += "<a class='noEdit' title='修改'" + updateuAuth + ">修改</a>";
            htmlContent += "<a class='noEdit' title='冻结'" + freezeAuth + ">冻结</a>";
            htmlContent += "<a class='noEdit' title='注销'" + writeoffAuth + ">注销</a>"
                + "<a  class='noEdit' title='重置密码'" + resetPwdAuth + ">重置密码</a>"
            htmlContent += "<a href='javaScript:;' class='check_option option_left5' title='删除'" + deleteAuth + " onclick='user.deleteUser($(this))' data-userId=" + data[i].id + ">删除</a>"
        } else {
            htmlContent += "<a href='javaScript:;' onclick='user.userInfo($(this))' class='check_option option_left1' title='修改'" + updateuAuth + " data-userId=" + data[i].id + ">修改</a>";
            if (isUser == 0) {
                if (statusDec == 1) {
                    htmlContent += "<a href='javaScript:;' data-id= '1' class='check_option option_left2' title='解冻'" + freezeAuth + " onclick='user.operation($(this))' data-userId=" + data[i].id + ">解冻</a>";
                } else {
                    htmlContent += "<a href='javaScript:;' data-id='0' class='check_option option_left2' title='冻结'" + freezeAuth + " onclick='user.operation($(this))' data-userId=" + data[i].id + ">冻结</a>";
                }
                htmlContent += "<a href='javaScript:;' class='check_option option_left3' title='注销'" + writeoffAuth + " onclick='user.logout($(this))' data-userId=" + data[i].id + ">注销</a>"
                    + "<a href='javaScript:;' class='check_option option_left4' title='重置密码'" + resetPwdAuth + " onclick='user.alterPassword($(this))' data-userId=" + data[i].id + ">重置密码</a>"
                    + "<a href='javaScript:;' class='check_option option_left5' title='删除'" + deleteAuth + " onclick='user.deleteUser($(this))' data-userId=" + data[i].id + ">删除</a>"
            }else{
                if (statusDec == 1) {
                    htmlContent += "<a class='noEdit' title='解冻' "+ freezeAuth + ">解冻</a>";
                } else {
                    htmlContent += "<a class='noEdit' title='冻结' "+ freezeAuth + ">冻结</a>";
                }
                htmlContent += "<a class='noEdit' title='注销' "+ writeoffAuth +">注销</a>"
                htmlContent += "<a href='javaScript:;' class='check_option option_left4' title='重置密码'" + resetPwdAuth + " onclick='user.alterPassword($(this))' data-userId=" + data[i].id + ">重置密码</a>";
                htmlContent += "<a title='删除' class='noEdit' title='删除' "+ deleteAuth +">删除</a>";
            }
        }
        +"</td>";
        htmlContent += "</tr>";
    }
    return htmlContent;
}

//新增用户
user.addUser = function () {
    var uname = $("#username").val();
    var password = $("#password").val();
    var name = $("#name").val();
    var mobile = $("#mobile").val();
    var email = $("#email").val();
    var roleId = $("#role").val();
    $.ajax({
        url: addUser,
        data: {
            "password": password,
            "uname": uname,
            "name": name,
            "mobile": mobile,
            "email": email,
            "roleId": roleId
        },
        type: "POST",
        dataType: 'json',
        async: true,

        success: function (data) {
            if (data.code == "0000") {
                user.selectUserList(1);
                window.location.reload();
            } else {
                aide.alert("用户新增失败，请重新操作");
            }
        }
    });
}
//获取用户信息
user.userInfo = function (obj) {
    var userId = $(obj).attr('data-userId');
    $.ajax({
        url: userInfo,
        data: {
            "id": userId,
        },
        type: "POST",
        dataType: 'json',
        async: true,

        success: function (data) {
            if (data.code == "0000") {
                user.alterUser(obj, data);
            } else {
                aide.alert("系统异常");
            }
        }
    })
}
//修改用户名
user.alterUser = function (obj, data) {
    //获取用户名
    var userName = $(obj).parent().parent().find('td:eq(0)').html();
    var userId = $(obj).attr('data-userId');
    aide.layerBlack(); //生成遮罩层
    var html = `<div class="add_user_content alter_user_content">
   		<form id="userEditForm">
   			<table class="add_user_tab">
   				<tbody>
   					<tr>
   						<td class="add_user_iw"><strong>用户名：</strong></td>
   						<td><span class="alteruser_name">${userName}</span></td>
   					</tr>
   					<tr>
   						<td class="add_user_iw"><strong>姓名：</strong></td>
   						<td><input type="text" placeholder="请输入姓名" value="${data.name}" id="nameEdit" name="nameEdit">
   						<i class="popup_error"></i>
   						</td>
   					</tr>
   					<tr>
   						<td class="add_user_iw"><strong>联系方式：</strong></td>
   						<td><input type="text" placeholder="请输入联系方式" value="${data.mobile}" id="phoneEdit" name="phoneEdit">
   						<i class="popup_error"></i>
   						</td>
   					</tr>
   					<tr>
   						<td class="add_user_iw"><strong>角色：</strong></td>
   						<td>
   							<div class="menu_template_box inPiece_popup_menu" id="menu_box2">
								<div class="down_menu_btn" data-id="0">
									<span></span>
									<input type="hidden" value="0" id="upRole" name="upRole">
								</div>
								<ul class="down_menu_list"></ul>
							</div>
   						</td>
   					</tr>
   					<tr>
   						<td class="add_user_iw"><strong>邮箱：</strong></td>
   						<td><input type="text" placeholder="请输入邮箱" value="${data.email}" id="emailEdit" name="emailEdit">
   						<i class="popup_error"></i>
   						</td>
   					</tr>
   				</tbody>
   			</table>
   		</form>
   	</div>`
    aide.popupCreate({
        id: 'alterUser_popup',
        title: '修改',
        html: html
    });
    var ind = user.indexOfList(data);
    //修改-角色
    aide.downMenu({
        id: 'menu_box2',
        onOff: true,
        bool: true,
        Iindex: ind,
        data: user.roleList,
        callBack: function (obj, index) {
        }
    });
    //校验
    user.initVerify();
    //关闭确认取消操作
    aide.popupOption({
        id: 'alterUser_popup',
        close: function (oDiv) { //关闭
            aide.closeBlack(oDiv);
        },
        sure: function (oDiv) { //确定
            if ($("#userEditForm").valid()) {
                aide.closeBlack(oDiv);
                //获取input里面的值
                var arrText = [];
                for (var i = 0; i < $('#alterUser_popup input').size(); i++) {
                    arrText.push($('#alterUser_popup input').eq(i).val());
                }
                $.ajax({
                    url: updateUserInfo,
                    data: {
                        "id": userId,
                        "name": arrText[0],
                        "mobile": arrText[1],
                        "roleId": arrText[2],
                        "email": arrText[3],
                    },
                    type: "POST",
                    dataType: 'json',
                    async: true,
                    success: function (data) {
                        if (data.code == "0000") {
                            user.selectUserList(user.nowpage);
                        } else {
                            aide.alert("用户编辑失败，请重新操作");
                        }
                    }
                });
            }
        },
        cancel: function (oDiv) { //取消
            aide.closeBlack(oDiv);
        }
    });
};

user.indexOfList = function (data) {
    var index = 0;
    for (var i = 0; i < user.roleList.length; i++) {
        var dic = user.roleList[i];
        if (dic.dataId == data.roleId) {
            return index = i;
        }
    }
    return index;
}

//解锁冻结
user.operation = function (obj) {
    var userName = $(obj).parent().parent().find('td:eq(0)').html();
    var dataId = $(obj).attr('data-id');
    var userId = $(obj).attr('data-userId');
    var title = dataId == 0 ? "是否要冻结" : "是否要解冻";
    var content = dataId == 0 ? "冻结后该账户将无法继续使用，解冻之后才可使用，请谨慎操作" : "解冻后该账户将正常继续使用";
    aide.layerBlack(); //生成遮罩层
    var html = `<div class="logout_popup_content">
			   		<h2>${title}<span>${userName}</span>？</h2>
			   		<p>${content}</p>
			   	</div>`
    aide.popupCreate({
        id: 'logout_popup',
        title: dataId == 0 ? "冻结" : "解冻",
        html: html
    });
    //关闭确认取消操作
    aide.popupOption({
        id: 'logout_popup',
        close: function (oDiv) { //关闭
            aide.closeBlack(oDiv);
        },
        sure: function (oDiv) { //确定
            aide.closeBlack(oDiv);
            $.ajax({
                url: dataId == 0 ? freezeUser : unFreezeUser,
                data: {
                    "id": userId,
                },
                type: "POST",
                dataType: 'json',
                async: true,

                success: function (data) {
                    if (data.code == "0000") {
                        user.selectUserList(user.nowpage);
                        $(obj.attr('data-id', dataId == 0 ? 1 : 0));
                    } else {
                        aide.alert("操作失败");
                    }
                }
            });
        },
        cancel: function (oDiv) { //取消
            aide.closeBlack(oDiv);
        }
    });
    // if(dataId==0){
    // 	$(obj).html('解锁');
    // 	$(obj).attr('data-id',1);
    // }else{
    // 	$(obj).html('冻结');
    // 	$(obj).attr('data-id',0);
    // }
}
//注销
user.logout = function (obj) {
    //获取用户名
    var userName = $(obj).parent().parent().find('td:eq(0)').html();
    var userId = $(obj).attr('data-userId');

    aide.layerBlack(); //生成遮罩层
    var html = `<div class="logout_popup_content">
			   		<h2>是否要注销<span>${userName}</span>？</h2>
			   		<p>注销后该账户将无法继续使用，请谨慎操作</p>
			   	</div>`
    aide.popupCreate({
        id: 'logout_popup',
        title: '注销',
        html: html
    });
    //关闭确认取消操作
    aide.popupOption({
        id: 'logout_popup',
        close: function (oDiv) { //关闭
            aide.closeBlack(oDiv);
        },
        sure: function (oDiv) { //确定
            aide.closeBlack(oDiv);
            $.ajax({
                url: logoutUser,
                data: {
                    "id": userId,
                },
                type: "POST",
                dataType: 'json',
                async: true,

                success: function (data) {
                    if (data.code == "0000") {
                        user.selectUserList(user.nowpage);
                    } else {
                        aide.alert("操作失败");
                    }
                }
            });
        },
        cancel: function (oDiv) { //取消
            aide.closeBlack(oDiv);
        }
    });
};
//删除
user.deleteUser = function (obj) {
    //获取用户名
    var userName = $(obj).parent().parent().find('td:eq(0)').html();
    var userId = $(obj).attr('data-userId');

    aide.layerBlack(); //生成遮罩层
    var html = `<div class="logout_popup_content">
			   		<h2>是否要删除<span>${userName}</span>？</h2>
			   		<p>删除后该账户将无法继续使用，请谨慎操作</p>
			   	</div>`
    aide.popupCreate({
        id: 'deleteUser_popup',
        title: '删除',
        html: html
    });
    //关闭确认取消操作
    aide.popupOption({
        id: 'deleteUser_popup',
        close: function (oDiv) { //关闭
            aide.closeBlack(oDiv);
        },
        sure: function (oDiv) { //确定
            aide.closeBlack(oDiv);
            $.ajax({
                url: delUser,
                data: {
                    "id": userId,
                },
                type: "POST",
                dataType: 'json',
                async: true,

                success: function (data) {
                    if (data.code == "0000") {
                        user.selectUserList(user.nowpage);
                        window.location.reload();
                    } else {
                        aide.alert("操作失败");
                    }
                }
            });
        },
        cancel: function (oDiv) { //取消
            aide.closeBlack(oDiv);
        }
    });
};
//重置密码
user.alterPassword = function (obj) {
    //获取用户名
    var userName = $(obj).parent().parent().find('td:eq(0)').html();
    var userId = $(obj).attr('data-userId');

    aide.layerBlack(); //生成遮罩层
    var html = `<div class="add_user_content alter_user_content">
   		<form id="resetPwdForm">
   			<table class="add_user_tab">
   				<tbody>
   					<tr>
   						<td class="add_user_iw"><strong>用户名：</strong></td>
   						<td><span class="alteruser_name">${userName}</span></td>
   					</tr>
   					<tr>
   						<td class="add_user_iw"><strong>密码：</strong><em>*</em></td>
   						<td>
   							<input type="password" placeholder="请输入密码" id="newPwd" name="newPwd">
   							<i class="popup_error"></i>
   						</td>
   					</tr>
   					<tr>
   						<td class="add_user_iw"><strong>确认新密码：</strong><em>*</em></td>
   						<td><input type="password" placeholder="请输入确认新密码" id="newPwdAgain" name="newPwdAgain">
   						    <i class="popup_error"></i>
   						</td>
   					</tr>
   				</tbody>
   			</table>
   		</form>
   	</div>`
    aide.popupCreate({
        id: 'alterPassword',
        title: '重置密码',
        html: html
    });
    user.initVerify();
    //关闭确认取消操作
    aide.popupOption({
        id: 'alterPassword',
        close: function (oDiv) { //关闭
            aide.closeBlack(oDiv);
        },
        sure: function (oDiv) { //确定
            if ($("#resetPwdForm").valid()) {
                //获取input里面的值
                var newPwd = $("#newPwd").val();
                aide.closeBlack(oDiv);
                $.ajax({
                    url: updatePwd,
                    data: {
                        "id": userId,
                        "passwordRst": newPwd,
                    },
                    type: "POST",
                    dataType: 'json',
                    async: true,

                    success: function (data) {
                        if (data.code == "0000") {
                            //重置成功
                        } else {
                            aide.alert("密码重置失败，请重新操作");
                        }
                    }
                });
            }
        }
        ,
        cancel: function (oDiv) { //取消
            aide.closeBlack(oDiv);
        }
    });
}

//校验
user.initVerify = function () {
    //检验方法
    $.validator.addMethod("isAccount", function (value, element) {
        var passport = /^[a-zA-z]\w{5,19}$/;
        if (this.optional(element) || (passport.test(value))) return true;
        return false;
    }, "6-20位，以字母开头可含数字或下划线");

    $.validator.addMethod("isMobPhone", function (value, element) {
        var passport = /(^1[345678]{1}[0-9]{9}$)/;
        return this.optional(element) || (passport.test(value));
    }, "请输入正确的手机号码");

    $.validator.addMethod("isHaveName", function (value, element) {
        var flag = true;
        $.ajax({
            url: checkAccount,
            data: {
                "account": value,
            },
            type: "POST",
            async: false,
            success: function (data) {
                var da = JSON.parse(data);
                if (da.code == "0000") {
                    flag = da.accountCount == 0;
                }
            }
        });
        return flag;
    }, "用户名已存在");

    $.validator.addMethod("haveValue", function (value, element) {
        return value != 0;
    }, "请选择角色类型");

    $.validator.addMethod("isEmail", function (value, element) {
        var passport = /^([0-9A-Za-z_\-])+(\.[0-9A-Za-z_\-]+)*@([0-9A-Za-z_\-])+((\.\w+)+)$/;
        return this.optional(element) || (passport.test(value));
    }, "请输入正确的电子邮箱");

    $.validator.addMethod("isSamePassword", function (value, element) {
        var passwordAdd = $("#password").val();
        var passwordAdd2 = $("#passwordAgain").val();
        if (passwordAdd == passwordAdd2) return true;
        return false;
    }, "两次密码输入不一致");

    $.validator.addMethod("isSamePasswordRestartPw", function (value, element) {
        var restartPassword = $("#newPwd").val();
        var restartPassword2 = $("#newPwdAgain").val();
        if (restartPassword == restartPassword2) return true;
        return false;
    }, "两次密码输入不一致");

    $.validator.addMethod("is20LengthControl", function (value, element) {
        var len = value.length;
        var reLen = 0;
        for (var i = 0; i < len; i++) {
            if (value.charCodeAt(i) < 27 || value.charCodeAt(i) > 126) {
                // 全角
                reLen += 2;
            } else {
                reLen++;
            }
        }
        if (reLen <= 20) return true;
        return false;
    }, "限字符20个,1个汉字是2个字符");
    $.validator.addMethod("isPassword", function (value, element) {
        var passport = /^(?![a-zA-z]+$)(?!\d+$)(?![~!@#$%^&*_]+$)[a-zA-Z\d~!@#$%^&*_]{6,20}$/;
        return this.optional(element) || (passport.test(value));
    }, "6-20位，必含数字和字母、允许英文字符");

    //添加用户的校验信息
    $("#userSaveForm").validate({
        rules: {
            username: {
                required: true,
                isAccount: true,
                is20LengthControl: true,
                isHaveName: true,
            },
            name: {
                required: true,
                is20LengthControl: true
            },
            password: {
                required: true,
                isPassword: true
            },
            passwordAgain: {
                required: true,
                isSamePassword: true,
                equalTo: "#password"
            },
            role: {
                required: true,
                haveValue: true
            },
            mobile: {
                required: true,
                isMobPhone: true
            },
            email: {
                isEmail: true
            }
        },
        errorPlacement: function (error, element) {
            if ($(element).parent().attr("id") == "rolediv") {
                $(element).parent().parent().parent().find(".popup_error").html(error).show();
            } else {
                $(element).parent().find(".popup_error").html(error).show();
            }
        },
        highlight: function (element, errorClass, validClass) { // element出错时触发
            if ($(element).parent().attr("id") == "rolediv") {
                $(element).parent().addClass("down_menu_active1");
            } else {
                $(element).addClass('active');
            }
        },
        unhighlight: function (element, errorClass, validClass) {
            if ($(element).parent().attr("id") == "rolediv") {
                $(element).parent().removeClass("down_menu_active1");
            } else {
                $(element).removeClass('active');
            }
        }
    });

    //用户信息修改校验
    $("#userEditForm").validate({
        rules: {
            nameEdit: {
                required: true,
                is20LengthControl: true
            },
            phoneEdit: {
                required: true,
                isMobPhone: true
            },
            upRole: {
                required: true,
                haveValue: true
            },
            emailEdit: {
                isEmail: true
            }
        },
        errorPlacement: function (error, element) {
            if ($(element).parent().attr("id") == "rolediv") {
                $(element).parent().parent().parent().find(".popup_error").html(error).show();
            } else {
                $(element).parent().find(".popup_error").html(error).show();
            }
        },
        highlight: function (element, errorClass, validClass) { // element出错时触发
            if ($(element).parent().attr("id") == "rolediv") {
                $(element).parent().addClass("down_menu_active1");
            } else {
                $(element).addClass('active');
            }
        },
        unhighlight: function (element, errorClass, validClass) {
            if ($(element).parent().attr("id") == "rolediv") {
                $(element).parent().removeClass("down_menu_active1");
            } else {
                $(element).removeClass('active');
            }
        }
    });

    //重置密码校验
    $("#resetPwdForm").validate({
        rules: {
            newPwd: {
                required: true,
                isPassword: true
            },
            newPwdAgain: {
                required: true,
                isSamePassword: true,
                equalTo: "#newPwd"
            }
        },
        errorPlacement: function (error, element) {
            $(element).parent().find(".popup_error").html(error).show();
        },
        highlight: function (element, errorClass, validClass) { // element出错时触发
            $(element).addClass('active');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('active');
        }
    });
}
