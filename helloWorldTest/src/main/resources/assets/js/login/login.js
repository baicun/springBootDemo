//页面模块名称
var login = {};
//初始化
login.init = function () {
    //校验
    login.initVerify();
    //获取短信验证码
    login.onOff = true;
    login.iTimer = null;
    $('#login_code').off('click').on('click', function () {
        login.code(this);
        login.getMobileCodeButton();
    });

    $('#get_img_code').off('click').on('click', function () {
        login.reloadVerifyCode();
    });

    $('#login_btn').off('click').on('click', function () {
        login.loginAction();
    });

    //回车登录
    $(document).keyup(function(event){
        if(event.keyCode ==13){
            login.loginAction();
        }
    });
}

//初始化调用
$(document).ready(login.init);

//获取短信验证码
login.code = function (obj) {
    login.num = 15;
    if (login.onOff) {
        login.onOff = false;
        $(obj).addClass('active_code');
        $(obj).html(login.num + 's后重试');
        login.iTimer = setInterval(function () {
            login.num--;
            if (login.num < 10) {
                $(obj).html('0' + login.num + 's后重试');
            } else {
                $(obj).html(login.num + 's后重试');
            }
            if (login.num == 0) {
                clearInterval(login.iTimer);
                $(obj).removeClass('active_code');
                $(obj).html('获取验证码');
                login.onOff = true;
            }
        }, 1000);

    }
}

//图片验证码
login.reloadVerifyCode = function () {
    var myimg = document.getElementById("get_img_code");
    var now = new Date();
    myimg.src = loginGetImgCode + '?code=' + now.getTime();
}

//短信验证码
login.getMobileCodeButton = function () {
    var username = $("#username").val();
    // 发送验证码
    $.ajax({
        url: msgCode,
        data: {
            "username": username
        },
        type: "POST",
        dataType: 'json',
        async: false,
        success: function (data) {
            if ('0000' != data.code) {
                $("#error").html(data.msg);
            }
        }
    });
}

login.loginAction = function () {
    if ($("#loginForm").valid()) {
        //删除cookie
        $.cookie("leftSideBar", "", {expires: -1, path: "/"});
        // var form = document.getElementById('loginForm');
        // form.submit();
        $("#loginForm").submit();
    }
}

//校验
login.initVerify = function () {

    //添加用户的校验信息
    $("#loginForm").validate({
        rules: {
            username: {
                required: true
            },
            password: {
                required: true
            },
            // mobileCode: {
            //     required: true
            // },
            // imgCode: {
            //     required: true
            // }
        },
        messages: {
            username: {
                required: "请输入用户名"
            },
            password: {
                required: "请输入密码"
            },
            mobileCode: {
                required: "请输入短信验证码"
            },
            imgCode: {
                required: "请输入验证码"
            }
        },
        errorPlacement: function (error, element) {
            if ($(element).attr("id") == "mobileCode" || $(element).attr("id") == "imgCode") {
                $(element).parent().parent().find(".login_error").html(error).show();
            } else {
                $(element).parent().find(".login_error").html(error).show();
            }
        }
    });
}
