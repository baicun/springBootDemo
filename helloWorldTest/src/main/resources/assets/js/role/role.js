//页面模块名称
var role = {};
role.resultdata = {};
role.nowpage = 1;

//初始化
role.init =function(){
    createPage();
	//table-移入变色
	aide.tabBackground({
		id:'table_box'
	})
	//删除提示层
	aide.tipLayer({
		id:'delete_hint',
		oClass:'.delete_option',
		iText:'该角色账号已被使用，无法删除，如需删除请先去删除该角色对应的账号。',
		left:174,
		top:70
	});
}
//初始化调用
$(document).ready(role.init);

//分页
function createPage() {
    //分页
    aide.page({
        id:'page',
        onOff: true,
        callBack: function (now, all, sum) {
            console.log('当前页:'+now+',总共页:'+all+',总条数:'+sum);
            role.findAllRole(now);
            return role.resultdata;
        }
    })
}

//删除
role.deleteRole = function(obj){
    var roleId = $(obj).attr('data-roleId');
	var index = $(obj).parent().parent().index();
	aide.layerBlack(); //生成遮罩层
	//生成
	var html =`<p class="popup_text">该角色权限还未解除，确定要删除吗？</p>`
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
			// $(obj).parent().parent().remove();
			aide.closeBlack(oDiv);
            role.delRole(roleId);
		},
		cancel:function(oDiv){ //取消
			aide.closeBlack(oDiv);
		}
	});
};

//删除
role.delRole = function(roleId) {
    $.ajax({
        url: delRole,
        data: {
            "id": roleId,
        },
        type: "POST",
        dataType: 'json',
        async: true,
        success: function (data) {
            if (data.code == "0000") {
                role.findAllRole(role.nowpage);
                window.location.reload();
            } else {
                aide.alert("操作失败");
            }
        }
    });
}

//角色列表
role.findAllRole = function (page) {
    role.nowpage = page;
    $.ajax({
        url: roleList,
        type: "get",
        data: {
            "pageSize": 10,
            "pageNum": page,
        },
        dataType: "json",
        async: false,
        success: function (data) {//回调函数，result，返回值
            role.resultdata = data;
            $("#tbody_box").html(role.createTable(data.list));
        },
        error: function (data) {
            aide.alert("获取数据异常");
        }
    });
}
//创建列表
role.createTable = function (data) {
    var htmlContent = "";
    for (var i = 0; i < data.length; i++) {
        htmlContent += "<tr>";
        var roleName = aide.notNull(data[i].name);
        var roleDes = aide.notNull(data[i].description);
        var createTime = aide.notNullOfDateTime(data[i].createTime);
        var isUser = data[i].isUse;
        var delType = data[i].delType; //管理员不可删除

        htmlContent += "<td class='table_padding' title="+ roleName +">" + roleName + "</td>";
        htmlContent += "<td>" + roleDes + "</td>";
        htmlContent += "<td>" + createTime + "</td>";

        //操作
        htmlContent += "<td class='options'>" ;
        htmlContent += "<a href='javaScript:;' class='check_option option_left10' onclick='role.updatePage($(this))' data-roleId=" + data[i].id + ">修改</a>"
		if(isUser == 1 || delType == 1){
			htmlContent += "<a href='javaScript:;' class='check_option option_left11 delete_option'><span>删除</span></a>"
		}else{
           htmlContent += "<a href='javaScript:;' class='check_option option_left11' onClick='role.deleteRole($(this))' data-roleId=" + data[i].id + ">删除</a>";
        }
        htmlContent += "</td></tr>";
    }
    return htmlContent;
}

role.updatePage = function (obj) {
    var roleId = $(obj).attr('data-roleId');
    window.location.href = updateRolePage+"?roleId="+roleId;
}






