//页面模块名称
var inPieceCentre = {};
var total, pageNum, pages;
var senceList, creatorList, senceInfo;
var initPageData = {};

inPieceCentre.selectAuth = '';
inPieceCentre.onOff = true;
//初始化场景名称列表
function initSence() {
    $.ajax({
        url: getSenceList,
        type: "get",
        data: {},
        dataType: "json",
        async: false,
        success: function (data) {
            var arr = new Array();
            var total = new Object();
            total.dataId = "00";
            total.name = "全部";
            arr.push(total);
            for (var i = 1; i < data.length + 1; i++) {
                var obj = new Object();
                obj.dataId = i.toString();
                obj.name = data[i - 1];
                arr.push(obj)
            }
            senceList = arr;
        }
    });
}

//初始化操作人列表
function initCreator() {
    $.ajax({
        url: getCreatorList,
        type: "get",
        data: {},
        dataType: "json",
        async: false,
        success: function (data) {
            var arr = new Array();
            var total = new Object();
            total.dataId = "00";
            total.name = "全部";
            arr.push(total);
            for (var i = 1; i < data.length + 1; i++) {
                var obj = new Object();
                obj.dataId = i.toString();
                obj.name = data[i - 1];
                arr.push(obj)
            }
            creatorList = arr;

        }
    });
}

//初始化
inPieceCentre.init = function () {

    inPieceCentre.selectAuth = aide.judgeAuth('entryManager/selectEntry');

    // 初始化场景名称列表和操作人列表
    initSence();
    initCreator();
    //创建分页
    createPage();
    if (inPieceCentre.selectAuth == '') {
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

    //table-下拉菜单-场景名称
    aide.downMenu({
        id: 'down_menu3',
        data: creatorList,
        callBack: function (obj, index) {
            $("#creatorAccount").val(getSenceName(creatorList, index));
            createPage()
        }
    });

    //table-下拉菜单-场景名称
    aide.downMenu({
        id: 'down_menu1',
        data: senceList,
        callBack: function (obj, index) {
            $("#sceneNameSearch").val(getSenceName(senceList, index));
            //创建分页
            createPage();
        }
    });

    //table-下拉菜单-处理状态
    aide.downMenu({
        id: 'down_menu2',
        data: [{'dataId': '0', 'name': '请选择'},
            {'dataId': '1', 'name': '整数'},
            {'dataId': '2', 'name': '小数'},
            {'dataId': '3', 'name': '字典'},
            {'dataId': '4', 'name': '文本'}
        ],
        callBack: function (obj, index) {

        }
    });

    //table排序
    aide.sort({
        id: 'order',
        tabId: 'table_box',
        callBack:function (onOff) {
            inPieceCentre.onOff = onOff;
            createPage();
        }
    });

    //table-移入变色
    aide.tabBackground({
        id: 'table_box'
    });
    //进件按钮点击
    $('#in_piece ,#in_piece1').off('click').on('click', function () {
        //初始化场景列表
        initSenceList();
        $('.upload_error_text').hide();
        removeDiv();
        aide.layerWhite(); //生成遮罩层
        aide.loaction({ //弹窗位置
            id: 'inPiece_popup',
            top: $(this).offset().top + 58,
            left: $(this).offset().left
        });
        aide.popupOption({
            id: 'inPiece_popup',
            close: function (oDiv) { //关闭
                aide.closeWhiteHide(oDiv);
            },
            sure: function (oDiv) { //确定
                //progress1()
                $('.upload_error_text').hide();
                addShow();
                console.log("-=-------------------------")
                console.log($("#sceneName").val() + "--171");
                //场景的id
                var sceneId = $("#sceneId").val();
                var sceneName = $("#sceneName").val();
                if (sceneId == "00") {
                    sceneId = "";
                }
                if (sceneName == "00") {
                    sceneName = "";
                }
                /*showLoading();*/
                $.ajaxFileUpload({
                    headers: {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
                    url: newBatchExamine + "?sceneId=" + sceneId
                    + "&sceneName=" + sceneName,
                    secureuri: false,//是否需要安全协议
                    fileElementId: 'excelFile',
                    dataType: "json",
                    data: {"_csrf": $("#csrfId").val()},
                    type: 'POST',
                    data: {_csrf: $("meta[name='_csrf']").attr("content")},
                    async: false,
                    complete: function () {
                        /*hideLoading();*/

                        /*$(".progress_bar_num").val(100 + '%');*/
                    },
                    success: function (data) {

                        var reData = eval('(' + data + ')');
                        var flag = reData.flag;
                        var reason = reData.reason;
                        var result = "";
                        if ("succ" == flag) {
                            //上传进度条
                            inPieceCentre.upload();
                            $('.fileNameIds').attr('class', 'upload_success_icon');
                            $('.upload_error_text').text(reason);
                            /*$(".zProgress").attr('value',100);
                            $(".progressValue").text(100 + '%');
                            $(".myProgress").removeClass('fail success doing');  $(".myProgress").addClass("success");*/
                            //重新加载页面信息
                            queryHistory(1);
                            aide.closeWhiteHide(oDiv);
                        } else {
                            removeDiv();
                            $('.fileNameIds').attr('class', 'upload_error_icon');
                            $('.upload_error_text').text(reason);
                            $('.upload_error_text').show();
                        }
                    },
                    error: function () {
                        ("请求失败，请联系管理员");
                        return false;
                    }
                });
            },
            cancel: function (oDiv) { //取消
                aide.closeWhiteHide(oDiv);
            }
        });


        //复原控件信息
        $("#fileNameIds").text("");
        //uploadNoStart();

    });

    //初始化场景列表
    function initSenceList() {
        $.ajax({
            url: getSceneInfo,
            type: "get",
            dataType: "json",
            async: false,
            success: function (data) {
                /*if(data==null||data.length==0){
                    aide.alert("暂无场景信息，请前往决策引擎添加场景信息！");
                    return;
                }*/
                var arr = new Array();
                var obj1 = new Object();
                obj1.dataId = "00";
                obj1.name = "请选择";
                arr.push(obj1)
                for (var i = 0; i < data.length; i++) {
                    var obj = new Object();
                    obj.dataId = data[i].id;
                    obj.name = data[i].name;
                    arr.push(obj)
                }
                senceInfo = arr;
                if (senceInfo.length > 1) {
                    $("#sceneId").val(senceInfo[1].dataId);
                    $("#sceneName").val(senceInfo[1].name);
                    inPieceCentre.downTemplate({
                        fileName: senceInfo[1].name + "-批量EXCEL模板下载.xlsx",
                        fileUrl: downExcel + "?sceneName=" + senceInfo[1].name + "&sceneId=" + senceInfo[1].dataId
                    })
                    //下拉菜单
                    aide.downMenu({
                        id: 'menu_box1',
                        onOff: true,
                        Iindex: 1,
                        data: arr,
                        callBack: function (obj, index) {
                            if (index == "00") {
                                $('.template_file a').removeClass('file_state');
                                $('.template_file a').html('模版文件.xlsx');
                                $('.template_file a').attr('href', 'javaScript:;');
                            } else {
                                $("#sceneId").val(index);
                                $("#sceneName").val(getSenceName(arr, index));
                                inPieceCentre.downTemplate({
                                    fileName: getSenceName(arr, index) + "-批量EXCEL模板下载.xlsx",
                                    fileUrl: downExcel + "?sceneName=" + getSenceName(arr, index) + "&sceneId=" + index
                                })
                            }
                        }
                    });
                }

                /*//默认显示新建立的场景
                $("#sceneId1").val(data[0].id);
                $("#sceneName1").val(data[0].name);

                //默认选择新建立的场景
                $("#sceneId").val(data[0].id);
                $("#sceneName").val(data[0].name);
                $(".excel-name").html(data[0].name+"-批量EXCEL模板下载.xlsx");*/
            }
        });
    }

    //回车搜索
    $("#sceneNameSearch").keyup(function(event){
        if(event.keyCode ==13){
            createPage();
        }
    });

};

// 根据index值获取选择的name
function getSenceName(data, index) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].dataId == index) {
            return data[i].name;
        }
    }
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

// 删除进度条显示
function removeDiv() {
    var my = document.getElementById("remove");
    if (my != null)
        my.parentNode.removeChild(my);
}

//进度条---失败状态
function uploadFaild() {
    $(".myProgress").removeClass('fail success doing');
    $(".myProgress").addClass("fail");
}

//进度条---复原状态
function uploadNoStart() {
    $(".myProgress").removeClass('fail success doing');
}

//创建分页
function createPage() {
    //分页
    aide.page({
        id: 'page',
        onOff: true,
        callBack: function (now, all, sum) {
            queryHistory(now);
            return initPageData;
        }
    });
}

//选择excel
function fileUpload(obj) {
    if (obj != null && obj.value != "") {
        var reg = /\.*.(xlsx|xls)$/;
        var fileName = obj.value;
        if (!fileName.match(reg)) {
            $(obj).after($(obj).clone().val(""));
            $(obj).remove();
            $("#fileNameIds").text("");
            aide.alert("请上传xlsx或xls格式模板！");
            //uploadF
            //aild()
        } else {
            var val = $("#excelFile").val();
            val = val.substr(val.lastIndexOf('\\') + 1);
            $('.upload_error_text').hide();
            $("#fileNameIds").text(val);
            /*submitExcel();*/
        }
    } else {
        $("#fileNameIds").text("");
    }
}

//查询历史记录
function queryHistory(page) {
    $("#pageNo").val(page);
    var search = $("#sceneNameSearch").val();
    var creator = $("#creatorAccount").val();
    if ("全部" == search) {
        search = "";
    }
    if ("全部" == creator) {
        creator = "";
    }
    $.ajax({
        url: findBatchList,
        type: "get",
        data: {
            "pageSize": 10,
            "pageNum": page,
            "search": search,
            "startDate": $("#startDate").val(),
            "endDate": $("#endDate").val(),
            "creator": creator,
            "sort": "a.create_date",
            "order" : inPieceCentre.onOff ? "desc" : "asc",  //时间排序 默认降序
        },
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.list.length == 0 && page == 1){
                $("#list").html('');
                $(".page_parent").hide();
                $(".no_info").show();
            }else {
                $(".no_info").hide();
                $(".page_parent").show();
                total = data.total;
                pageNum = data.pageNum;
                pages = data.pages;
                initPageData = data;
                var html = "";
                if (data.length == 0) {
                    html += "<tr><td colspan='4'>" + "暂无数据" + "</td></tr>";
                } else {
                    for (var i = 0; i < data.size; i++) {
                        var selAuth = aide.judgeAuth("entryManager/selectEntry");
                        var sceneName = aide.notNull(data.list[i].sceneName);
                        var rightNums = aide.notNull(data.list[i].rightNums);
                        html += "<tr data-time=" + data.list[i].createDate.substring(0, 10) + ">";
                        html += "<td title="+ sceneName +">" + sceneName + "</td>"
                        html += "<td title="+ data.list[i].applyNoBath +">" + data.list[i].applyNoBath + "</td>"
                        html += "<td>" + rightNums + "</td>"
                        if (data.list[i].enterStatus == "0000") {
                            html += "<td><p class='state_dot state_dot1'>处理完成</p></td>"
                        } else {
                            html += "<td><p class='state_dot state_dot2'>处理中</p></td>"
                        }
                        html += "<td>" + aide.notNullOfDateTime(data.list[i].createDate) + "</td>"
                        html += "<td>" + aide.notNull(data.list[i].creator) + "</td>"
                        //操作
                        html += "<td class='operate_btn' "+ selAuth +">";
                        html += "<a href='" + url + "/entry/indexEdit?applyNoBath=" + data.list[i].applyNoBath + "' class='check_option'>查看处理结果</a>";
                        html += "</td>";
                        html += "</tr>";
                    }
                }
                $("#list").html(html);
            }
            /*createPage(data.total,data.pageNum,data.pages);*/

        },
        error: function () {
            aide.alert("获取进件信息异常");
        }
    });

}

//提交录入
function submitExcel() {
    progress1()
    console.log("-=-------------------------")
    //场景的id
    var sceneId = $("#sceneId").val();
    var sceneName = $("#sceneName").val();
    if (sceneId == "00") {
        sceneId = "";
    }
    if (sceneName == "00") {
        sceneId = "";
    }
    /*showLoading();*/
    $.ajaxFileUpload({
        url: newBatchExamine + "?sceneId=" + sceneId
        + "&sceneName=" + sceneName,
        secureuri: false,//是否需要安全协议
        fileElementId: 'excelFile',
        dataType: "json",
        type: 'POST',
        async: true,
        complete: function () {
            /*hideLoading();*/
            /*$(".zProgress").attr('value',100);
            $(".progressValue").text(100 + '%');
            $(".myProgress").removeClass('fail success doing');  $(".myProgress").addClass("success");*/
            $(".progress_bar_num").val(100 + '%');
        },
        success: function (data) {

            var reData = eval('(' + data + ')');
            var flag = reData.flag;
            var reason = reData.reason;
            var result = "";
            if ("succ" == flag) {
                //alert(reason);
                aide.closeWhiteHide(oDiv);
            } else {
                //alert(reason);
            }
            //重新加载页面信息
            queryHistory(1);
        },
        error: function () {
            ("请求失败，请联系管理员");
            return false;
        }
    });
}

//虚拟进度条代码
function progress1() {
    $(".myProgress").removeClass('fail success doing');
    $(".myProgress").addClass("doing");
    if (timer) {
        clearInterval(timer);
    }
    var timer = setInterval(function () {
        var time = $(".zProgress").attr('value');
        time = parseInt(time);
        time += 2;
        $(".zProgress").attr('value', time);
        $(".progressValue").text(time + '%');
        if (time >= 98) {
            clearInterval(timer);
            //成功的话改为100
            $(".zProgress").attr('value', 100);
            $(".progressValue").text(100 + '%');
            $(".inputPop .iconSuccess2").css("display", "inline-block");
        }
    }, 100);
}

//初始化调用
$(document).ready(inPieceCentre.init);
//下拉菜单点击显示不同的内容
inPieceCentre.downTemplate = function (opt) {
    var fileUrl = opt.fileUrl || '';
    var fileName = opt.fileName || '';
    $('.template_file a').addClass('file_state');
    $('.template_file a').html(fileName);
    $('.template_file a').attr('href', fileUrl);
}
//上传进度条
inPieceCentre.upload = function () {
    var num = 100;
    $('.progress_bar_son').css('width', num + '%');
    $('.progress_bar_num').html(num + '%');
};
