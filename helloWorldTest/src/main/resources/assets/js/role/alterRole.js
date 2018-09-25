//页面模块名称
var alterRole = {};
//初始化
alterRole.init = function () {
    if (roleData.code == "0000") {
        $("#role_box").html(alterRole.createHtml(roleData.permission));
        $("#roleName").val(roleData.name);
        $("#roleDes").val(aide.notNull(roleData.description));
    }
    roleManage.role(); //角色权限设置
    alterRole.initVerify();
    // //点击保存
    // $('.template_btn1').off('click').on('click',function(){
    //
    // })
}
//初始化调用
$(document).ready(alterRole.init);

alterRole.createHtml = function (permList) {
    var htmlCon = "<ul class='role_box_list'>";
    for (var i = 0; i < permList.length; i++) {
        var data = permList[i];
        htmlCon += "<li>";
        if (i == 0) {
            htmlCon += "<h2 class='role_title'>";
        } else {
            htmlCon += "<h2 class='role_title role_title_mar'>";
        }
        if (data.isSel == 1) {
            htmlCon += "<span class='active' data-id=" + data.id + "></span>";
        } else {
            htmlCon += "<span class='active1' data-id=" + data.id + "></span>";
        }
        htmlCon += "<strong>" + data.name + "</strong>";
        htmlCon += "</h2>";
        if (data.children != null) {
            var children = data.children;
            htmlCon += "<ul class='role_box_list1'>";
            var haveChildren  = false;
            var have = false;
            for (var j = 0; j < children.length; j++) {
                if (children[j].children != null) {
                    haveChildren = true;
                    break;
                }
            }
            for (var j = 0; j < children.length; j++) {
                if (children[j].children != null) {
                    htmlCon += "<li>";
                    htmlCon += "<h2 class='role_title1 role_title_one'>";
                    if (children[j].isSel == 1) {
                        htmlCon += "<span class='active' data-id=" + children[j].id + "></span>";
                    } else {
                        htmlCon += "<span class='active1' data-id=" + children[j].id + "></span>";
                    }
                    htmlCon += "<strong>" + children[j].name + "</strong>";
                    htmlCon += "<em class='role_icon'></em>";
                    htmlCon += "</h2>";
                    if (children[j].children != null) {
                        var children1 = children[j].children;
                        htmlCon += "<ul class='role_box_list2'>";
                        var isFirst = false;
                        var isChildren = false;
                        for (var k = 0; k < children1.length; k++) {
                            if (children1[k].children != null) {
                                isChildren = true;
                                break;
                            }
                        }
                        for (var k = 0; k < children1.length; k++) {
                            if (children1[k].children != null) {
                                htmlCon += "<li>";
                                htmlCon += "<h2 class='role_title1 role_title_one'>";
                                if (children1[k].isSel == 1) {
                                    htmlCon += "<span class='active' data-id=" + children1[k].id + "></span>";
                                } else {
                                    htmlCon += "<span class='active1' data-id=" + children1[k].id + "></span>";
                                }
                                htmlCon += "<strong>" + children1[k].name + "</strong>";
                                htmlCon += "<em class='role_icon'></em>";
                                htmlCon += "</h2>";
                                var children2 = children1[k].children;
                                htmlCon += "<ul class='role_box_list2'>";
                                var isSel = false;
                                for (var m = 0; m < children2.length; m++) {
                                    if (children2[m].isSel == 1) {
                                        isSel = true;
                                        htmlCon += "<li class ='sublevel'><span class='active' data-id=" + children2[m].id + "></span><strong>" + children2[m].name + "</strong></li>";
                                    } else {
                                        htmlCon += "<li class ='sublevel'><span class='active1' data-id=" + children2[m].id + "></span><strong>" + children2[m].name + "</strong></li>";
                                    }
                                }
                                if (isSel) {
                                    htmlCon += "<li><p class='role_error' hidden>至少配置一种模式</p></li>";
                                }else{
                                    htmlCon += "<li><p class='role_error'>至少配置一种模式</p></li>";
                                }
                                htmlCon += "</ul></li>";
                            } else {
                                if (isChildren) {
                                    if (!isFirst) {
                                        htmlCon += "<li>";
                                        htmlCon += "<h2 class='role_title1 role_title_one' style='display:none;'>";
                                        htmlCon += "<span class='active1'></span>";
                                        htmlCon += "</h2>";
                                        htmlCon += "<ul class='role_box_list2' style='padding-left:0px;'>";

                                        for (var m = k; m < children1.length; m++) {
                                            if (children1[m].children == null) {
                                                if (children1[m].isSel == 1) {
                                                    htmlCon += "<li class ='sublevel'><span class='active' data-id=" + children1[m].id + "></span><strong>" + children1[m].name + "</strong></li>";
                                                } else {
                                                    htmlCon += "<li class ='sublevel'><span class='active1' data-id=" + children1[m].id + "></span><strong>" + children1[m].name + "</strong></li>";
                                                }
                                            } else {
                                                continue;
                                            }
                                        }
                                        htmlCon += "</li></ul>";
                                        isFirst = true;
                                    }
                                }else{
                                    if (children1[k].isSel == 1) {
                                        htmlCon += "<li class ='sublevel'><span class='active' data-id=" + children1[k].id + "></span><strong>" + children1[k].name + "</strong></li>";
                                    } else {
                                        htmlCon += "<li class ='sublevel'><span class='active1' data-id=" + children1[k].id + "></span><strong>" + children1[k].name + "</strong></li>";
                                    }
                                }
                            }
                        }
                        htmlCon += "</ul>";
                    }
                    htmlCon += "</li>";
                } else {
                    if (haveChildren) {
                        if (!have) {
                            htmlCon += "<li>";
                            htmlCon += "<h2 class='role_title1 role_title_one' style='display:none;'>";
                            htmlCon += "<span class='active1'></span>";
                            htmlCon += "</h2>";
                            htmlCon += "<ul class='role_box_list2' style='padding-left:0px;'>";

                            for (var m = j; m < children.length; m++) {
                                if (children[m].children == null) {
                                    if (children[m].isSel == 1) {
                                        htmlCon += "<li class ='sublevel'><span class='active' data-id=" + children[m].id + "></span><strong>" + children[m].name + "</strong></li>";
                                    } else {
                                        htmlCon += "<li class ='sublevel'><span class='active1' data-id=" + children[m].id + "></span><strong>" + children[m].name + "</strong></li>";
                                    }
                                } else {
                                    continue;
                                }
                            }
                            htmlCon += "</li></ul>";
                            have = true;
                        }
                    } else{
                        if (children[j].isSel == 1) {
                            htmlCon += "<li class ='sublevel'><span class='active' data-id=" + children[j].id + "></span><strong>" + children[j].name + "</strong></li>";
                        } else {
                            htmlCon += "<li class ='sublevel'><span class='active1' data-id=" + children[j].id + "></span><strong>" + children[j].name + "</strong></li>";
                        }
                    }
                }
            }
            htmlCon += "</ul>";
        }
        htmlCon += "</li>";
    }
    htmlCon += "</ul>";
    return htmlCon;
}

//保存
alterRole.save = function () {
    if (!$("#updateForm").valid()) return;
    var arr = roleManage.getId(); //获取选中id
    if (arr.length == 0) {
        alert('请选择角色权限');
        return;
    } else {
        var obj = $('.role_box_list3 p');
        for (var i = 0; i < obj.size(); i++) {
            if (!obj.eq(i).is(':hidden')) {
                aide.alert("至少配置一种模式");
                return;
            }
        }
    }
    var arrStr = arr.join(',');
    $.ajax({
        url: editRoleInfo,
        type: "post",
        data: {
            "id": roleData.id,
            "name": $("#roleName").val(),
            "description": $("#roleDes").val(),
            "selList": arrStr,
        },
        dataType: "json",
        async: false,
        success: function (data) {//回调函数，result，返回值
            //创建成功
            if (data.code == "0000") {
                window.location.href = url + "/roleManager/index/";
            } else {
                aide.alert(data.message);
            }
        },
        error: function (data) {
            aide.alert("获取数据异常");
        }
    });
}

//校验
alterRole.initVerify = function () {

    $.validator.addMethod("isNameOnly", function (value, element) {
        var flag = true;
        if (roleData.name == value) {
            return true;
        }
        $.ajax({
            url: checkRoleName,
            data: {
                "name": value,
            },
            type: "POST",
            async: false,
            success: function (data) {
                var da = JSON.parse(data)
                if (da.code == "0000") {
                    flag = da.nameCount == 0;
                }
            }
        });
        return flag;
    }, "角色名称已存在");
    $.validator.addMethod("isStandard", function (value, element) {
        var standard1 = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
        return standard1.test(value);
    }, "只能输入汉字/英文/数字");

    //添加用户的校验信息
    $("#updateForm").validate({
        rules: {
            roleName: {
                required: true,
                isStandard: true,
                maxlength: 16,
                isNameOnly: true,
            },
            roleDes: {
                maxlength:200,
            }
        },
        messages: {
            roleName: {
                required: "角色名称不能为空",
                maxlength: "输入不能超过16个字符"
            },
            roleDes: {
                maxlength:"输入不能超过200个字符"
            }
        },
        errorPlacement: function (error, element) {
            $(element).parent().find("i").html(error).show();
        },
        highlight: function (element, errorClass, validClass) { // element出错时触发
            $(element).addClass('active');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('active');
        }
    });
}