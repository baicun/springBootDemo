//页面模块名称
var alterData = {};
//存储接口数据
var interData;
alterData.footIndex = 0;
alterData.codeIndex=0;
alterData.codeDecIndex=0;
alterData.fieldIndex = 0;
//初始化
alterData.init =function(){
    interData=initInterList();
	alterData.n = 0;
    //初始化校验
    alterData.initVerify();
	console.log(data);
	alterData.fields({

		onOff:true
	}); //字段初始化
    initData();
}
//初始化调用
$(document).ready(alterData.init);

//字段初始化
alterData.fields = function(opt){
	var onOff = opt.onOff || false;
	alterData.n++;
	var ifRelation = data.ifRelation;
	if(onOff){
        if(ifRelation=="1"){
		$('#fields_list').append(`<li>
			<div class="fields_text">`
                +'<div>'
				+'<input type="text" placeholder="请输入" value="'+data.name+'" name="field_name" id="field_name'+alterData.footIndex++ +'" onkeyup="this.value=this.value.replace(/\\s+/g,\'\')"/>'
				+'<p class="fields_error"></p>'
                +'</div>'
                +'<div>'
				+'<input type="text" placeholder="请输入" value="'+data.value+'" name="en_name" id="en_name'+alterData.footIndex++ +'" onkeyup="this.value=this.value.replace(/\\s+/g,\'\')" />'
				+'<p class="fields_error fields_error2"></p>'
                +'</div>'+
				`<div class="menu_template_box fl" id="menu_box${alterData.n}">
					<div class="down_menu_btn">
						<span class="menu_title_color">请选择</span>
						<input type="hidden" value="0" id="datatype" name="datatype">
					</div>
					<ul class="down_menu_list" ></ul>
				</div>
				<p class="fields_error fields_error3"></p>
				<p class="fields_radio" id="fields_radio${alterData.n}">
					<a href="javaScript:;" data-id="0" class="fl">是</a>
					<a href="javaScript:;" data-id="1" class="fr radio_acitve">否</a>
				</p>
				<div class="fields_source">
					<div class="menu_template_box menu_template_box1 fl" id="menu_boxs${alterData.n}">
						<div class="down_menu_btn">
							<span class="menu_title_color">请选择</span>
							<input type="hidden" value="0">
						</div>
						<ul class="down_menu_list"></ul>
					</div>
					<p class="fields_error fields_error4"></p>
					<a href="javaScript:;" class="add_fields" data-id="0" onclick="alterData.add($(this))">添加字段</a>
					<i></i>
				</div>
			</div>
		</li>`)
	}else{//如果字段已经建立规则
            if(ifRelation == "0"){
                $('#fields_list').append(`<li>
                    <div class="fields_text">`
                            +'<input type="text" placeholder="请输入" readonly="readonly" value="'+data.name+'"  onkeyup="this.value=this.value.replace(/\\s+/g,\'\')"/>'
                            +'<input type="text" placeholder="请输入" readonly="readonly" value="'+data.value+'" onkeyup="this.value=this.value.replace(/\\s+/g,\'\')"/>'+
                            `<div class="menu_template_box fl" id="menu_box${alterData.n}">
                            <div class="down_menu_btn">
                                <span class="menu_title_color">请选择</span>
                                <input type="hidden" value="0" id="datatype" name="datatype">
                            </div>
                            <ul class="down_menu_list" ></ul>
                        </div>
                        <p class="fields_radio" id="fields_radio${alterData.n}">
                            <a href="javaScript:;" data-id="0" class="fl">是</a>
                            <a href="javaScript:;" data-id="1" class="fr radio_acitve">否</a>
                        </p>
                        <div class="fields_source">
                            <div class="menu_template_box menu_template_box1 fl" id="menu_boxs${alterData.n}">
                                <div class="down_menu_btn">
                                    <span class="menu_title_color">请选择</span>
                                    <input type="hidden" value="0">
                                </div>
                                <ul class="down_menu_list"></ul>
                            </div>
                            <a href="javaScript:;" class="add_fields" data-id="0" onclick="alterData.add($(this))">添加字段</a>
                            <i></i>
                        </div>
                    </div>
                </li>`)

            }else{//查看模式

                $('#fields_list').append(`<li>
                    <div class="fields_text">`
                            +'<input type="text" placeholder="请输入" readonly="readonly" value="'+data.name+'"/>'
                            +'<input type="text" placeholder="请输入" readonly="readonly" value="'+data.value+'"/>'+
                            `<div class="menu_template_box fl" id="menu_box${alterData.n}">
                            <div class="down_menu_btn">
                                <span class="menu_title_color">请选择</span>
                                <input type="hidden" value="0" id="datatype" name="datatype">
                            </div>
                            <ul class="down_menu_list" ></ul>
                        </div>
                        <p class="fields_radio" id="fields_radio${alterData.n}">
                            <a href="javaScript:;" data-id="0" class="fl">是</a>
                            <a href="javaScript:;" data-id="1" class="fr radio_acitve">否</a>
                        </p>
                        <div class="fields_source">
                            <div class="menu_template_box menu_template_box1 fl" id="menu_boxs${alterData.n}">
                                <div class="down_menu_btn">
                                    <span class="menu_title_color">请选择</span>
                                    <input type="hidden" value="0">
                                </div>
                                <ul class="down_menu_list"></ul>
                            </div>
                            <a href="javaScript:;" class="add_fields" data-id="0" onclick="alterData.add($(this))">添加字段</a>
                            <i></i>
                        </div>
                    </div>
                </li>`)

            }


        }
	}

	var oDiv = 'menu_box'+alterData.n;
	var oDiv1 = 'menu_boxs'+alterData.n;
	var radios = 'fields_radio'+alterData.n;
	//下拉菜单-数据类型
	var typeIndex=0;
	if(data.type==1){
        typeIndex=1;
	}else if(data.type==2){
        typeIndex=2
	}else if(data.type==4){
        typeIndex=3
	}else if(data.type==5){
        typeIndex=4;
	}
	aide.downMenu({
		id:oDiv,
		onOff:true,
		Iindex:typeIndex,
		data:[
			{'dataId':'0','name':'请选择'},
			{'dataId':'1','name':'整数'},
			{'dataId':'2','name':'小数'},
			{'dataId':'4','name':'字典'},
			{'dataId':'5','name':'文本'}
		],
		callBack:function(obj,index){
            if(index == 0) {
                $(obj).parent().parent().parent().find(".fields_error3").html("请选择数据类型").show();
                $(obj).parent().addClass("fields_error_acitve");
            }else{
                $(obj).parent().parent().parent().find(".fields_error3").html("").show();
                $(obj).parent().removeClass("fields_error_acitve");
            }
			if(index==4){
				if($(obj).parent().parent().parent().parent().find('.fields_dictionaries').length!=0){
                    $(obj).parent().parent().parent().parent().find('.fields_dictionaries').show();
				}else{
                    $(obj).parent().parent().parent().parent().append(`
					<div class="fields_dictionaries">
						<h3 class="dictionaries_title">
							<span>编码</span>
							<span>描述</span>
						</h3>
						<div class="dictionaries_box">
							<div class="dictionaries_text">
								<div class="dictionaries_text_input fl" id="typediv">
								    <!--<div>-->
									<input type="text" placeholder="请输入字母或数字" id="code_${alterData.codeIndex++}" name="code"  onkeyup="this.value=this.value.replace(/\\s+/g,'')"/>
									<p class="fields_error fields_error7"></p>
									<!--</div>-->
									<!--<div>-->
								    <input type="text" placeholder="请输入" id="code_dec_${alterData.codeDecIndex++}" name="code_dec" onkeyup="this.value=this.value.replace(/\\s+/g,'')"/>
									<p class="fields_error fields_error8"></p>
									<!--</div>-->
								</div>
								<div class="fields_option dictionaries_option fl">
									<a href="javaScript:;" data-id="1" class="fl add_fields_btn" onclick="alterData.dictionaries($(this))">&#xe61f;</a>
								</div>
							</div>
						</div>
						<p class="describe">例：输入0001，描述内容</p>
					</div>
				`);
				}
			}else{
				$(obj).parent().parent().parent().parent().find('.fields_dictionaries').hide();
			}
		}
	});
	//下拉菜单-接口名称
	var interIndex=0;
	if(data.dataSource==1){
		for(var i=0;i<interData.length;i++){
			if(interData[i].dataId==data.relationParamBean.interfaceId){
                interIndex=i;
			}
		}
	}
	aide.downMenu({
		id:oDiv1,
		onOff:true,
		Iindex:interIndex,
		data:interData,
		callBack:function(index){

		}
	});
    var iindex=1;
   /* if(interData.length<=1){
    	iindex=2;
    }else*/ if(data.dataSource==1){
        iindex=0;
    }
    //是否调用数据源
    alterData.radio({
        id:radios,
        Iindex:iindex    //参数 0  1  2  3 四种状态
    });
	//是否调用数据源
	/*alterData.radio({
		id:radios,
		Iindex:1
	});*/

};
//是否调用数据源
alterData.radio = function(opt){
	if(!opt.id) return false;
	var obj = document.getElementById(opt.id);
	var Iindex = opt.Iindex || 0;

	$(obj).find('a').removeClass('radio_acitve');
	$(obj).find('a').eq(Iindex).addClass('radio_acitve');
	if(Iindex==0){
		$(obj).parent().find('.fields_source').show();
	}else{
		$(obj).parent().find('.fields_source').hide();
	}

	$(obj).find('a').on('click',function(){
		$(obj).find('a').removeClass('radio_acitve');
		$(this).addClass('radio_acitve');
		if($(this).attr('data-id')==0){
			$(obj).parent().find('.fields_source').show();
		}else{
			$(obj).parent().find('.fields_source').hide();
		}
	})

};
//字典添加删除
alterData.dictionaries = function(obj){
	var dataId = $(obj).attr('data-id');

	if(dataId==0){ //删除
		$(obj).parent().parent().remove();
	}else{ //添加
		$(obj).parent().parent().parent().append(`
			<div class="dictionaries_text">
				<div class="dictionaries_text_input fl" id="typediv">
					<!--<div>-->
					<input type="text" placeholder="请输入字母或数字" id="code_${alterData.codeIndex++}" name="code" onkeyup="this.value=this.value.replace(/\\s+/g,'')"/>
					<p class="fields_error fields_error7"></p>
					<!--</div>-->
					<!--<div>-->
					<input type="text" placeholder="请输入" id="code_dec_${alterData.codeDecIndex++}" name="code_dec" onkeyup="this.value=this.value.replace(/\\s+/g,'')"/>
					<p class="fields_error fields_error8"></p>
					<!--</div>-->
				</div>
				<div class="fields_option dictionaries_option fl">
					<a href="javaScript:;" data-id="1" class="fl add_fields_btn" onclick="alterData.dictionaries($(this))">&#xe61f;</a>
					<a href="javaScript:;" data-id="0" class="fr del_fields_btn" onclick="alterData.dictionaries($(this))">&#xe61d;</a>
				</div>
			</div>
		`)
	}

};
//添加字段
alterData.add = function(obj){
    //获取接口的入参和出参
    var interId ;
    if(obj.attr("data-id")==0){
        interId=obj.parent().find(".down_menu_btn").attr("data-id");

    }else if(obj.attr("data-id")==1){
        interId=obj.parent().parent().find(".down_menu_btn").attr("data-id");
    }
    var fieldName =obj.parent().parent().find("div").eq(0).find("input").val();
    if(fieldName==null||""==fieldName){
        aide.alert("请先定义字段名称！");
        return;
    }
    if(interId=="0"){
        // obj.parent().find(".login_error").html("请先选择接口").show();
        alert('请先选择接口');
        return;
    }
    var interData=findFieldZDropInfo(interId);
    var coustomField=new Array();
    coustomField.push({"dataId":"0","name":"请选择"});
    $.each(interData.customField,function(index,item){
        coustomField.push({"dataId":JSON.stringify({"id":item.id,"name":item.name,"value":item.value,"type":item.type}),
            "name":item.name})
    })
    var exparParam=new Array();
    exparParam.push({"dataId":"0","name":"请选择"});
    $.each(JSON.parse(interData.interInfo.expar),function(index,item){
        exparParam.push({"dataId":item.exparValue,"name":item.exparName});
    })


	var dataId = $(obj).attr('data-id');
	if(dataId==0){
		$(obj).parent().parent().parent().addClass('fields_list_active');
	}else{
		$(obj).parent().parent().parent().parent().addClass('fields_list_active');
	}
	aide.layerWhite(); //遮罩层
	$('body').append(`
		<div class="popup_box fields_popup" id="fields_popup">
			<div class="popup_title">
		        <span>添加字段</span>
		        <a href="javaScript:;" class="popup_close">&#xe617;</a>
		    </div>
		    <div class="popup_center clear">
		    		        <form id="fieldContent">
		    	<div class="popup_left fl">
			    	<p class="popup_fields_title">
				        <span class="fl popup_left_s1">自定义字段</span>
				        <span class="fr popup_left_s2">接口输入字段</span>
				    </p>
				    <div class="popup_down_menu" id="popup_down_menu1"></div>
				    <p class="fields_tip1">必须映射接口全部输入字段，如还未有对应的字段，请建立字段</p>
		    	</div>
		    	<div class="popup_left popup_right fr">
		    		<p class="popup_fields_title">
				        <span class="fl popup_left_s1">自定义字段</span>
				        <span class="fr popup_left_s2 popup_left_s3">接口输入字段</span>
				    </p>
				    <div class="popup_down_menu" id="popup_down_menu2"></div>
		    	</div>
		    	</form>
		    </div>
		    <div class="popup_btn">
		    	<a href="javaScript:;" class="popup_cancel">取消</a>
		    	<a href="javaScript:;" class="popup_sure">保存</a>
		    </div>
		   
		</div>
	`);
	//var len1 = 3;
	//var len2 = 2;
    var inparParmList=JSON.parse(interData.interInfo.inpar);
	for(var i=0;i<inparParmList.length;i++){
		$('#popup_down_menu1').append(`
			<div class="popup_menu_parent">
		    	<div class="menu_template_box menu_template_box1 fl" id="popup_menu${i}">
					<div class="down_menu_btn" data-id="0">
						<span class="menu_title_color">请选择</span>
						<input type="hidden" value="0" id="field${alterData.fieldIndex++}" name="field">
					</div>
					<ul class="down_menu_list"></ul>
				</div>
								<p class="fields_error fields_error5"></p>
				<strong class="popup_icon"></strong>`+
				'<span class="popup_name" data-value="'+inparParmList[i].inparValue+'">'+inparParmList[i].inparName+'</span>'
            +'</div>'
		)
		//下拉菜单
		aide.downMenu({
			id:'popup_menu'+i,
			onOff:true,
			//Iindex:4,
			data:coustomField,
			callBack:function(obj,index){
                if(index == 0) {
                    $(obj).parent().parent().parent().find("p").html("请选择自定义字段").show();
                    $(obj).parent().addClass("fields_error_acitve");
                }else{
                    $(obj).parent().parent().parent().find("p").html("").show();
                    $(obj).parent().removeClass("fields_error_acitve");
                }
			}
		});

	}
    var customFieldName;
    if(obj.attr("data-id")==0){
        customFieldName=obj.parent().parent().find("input").eq(0).val();
    }else if(obj.attr("data-id")==1){
        customFieldName=obj.parent().parent().parent().find("input").eq(0).val();
    }
	for(var i=0;i<1;i++){
		$('#popup_down_menu2').append(`
			<div class="popup_menu_parent">`
            +'<span class="popup_name popup_name1">'+customFieldName+'</span>'+
				`<strong class="popup_icon"></strong>
		    	<div class="menu_template_box menu_template_box1 fl" id="popup_menus${i}">
					<div class="down_menu_btn" data-id="0">
						<span class="menu_title_color">请选择</span>
						<input type="hidden" value="0" id="outField${alterData.fieldIndex++}" name="outField">
					</div>
					<ul class="down_menu_list"></ul>
				</div>
								<p class="fields_error fields_error6"></p>
			</div>
		`)
        alterData.initVerify();
        //下拉菜单
		aide.downMenu({
			id:'popup_menus'+i,
			onOff:true,
			//Iindex:4,
			data:exparParam,
			callBack:function(obj,index){
                if(index == 0) {
                    $(obj).parent().parent().parent().find("p").html("请选择输出字段").show();
                    $(obj).parent().addClass("fields_error_acitve");
                }else{
                    $(obj).parent().parent().parent().find("p").html("").show();
                    $(obj).parent().removeClass("fields_error_acitve");
                }
			}
		});

	}


    if(obj.attr("data-id")==1){
        //弹框赋编辑的初始值
        var zDropParam=JSON.parse(obj.parent().parent().parent().attr("data-value"));
        if(interId==zDropParam.interId){
            $.each(zDropParam.inparArray,function(index,item){
                var input=$("#popup_down_menu1 .popup_menu_parent").eq(index);
                input.find(".down_menu_btn").attr("data-id",JSON.stringify(item.interInparCustomField));
                input.find(".down_menu_btn span").eq(0).text(item.interInparCustomField.name).removeClass("menu_title_color");
                input.find(".down_menu_btn input").eq(0).val(JSON.stringify(item.interInparCustomField));
            })
            var output=$("#popup_menus0");
            output.find(".down_menu_btn").attr("data-id",zDropParam.interExpar.exparValue);
            output.find(".down_menu_btn span").eq(0).text(zDropParam.interExpar.exparName).removeClass("menu_title_color");
            output.find(".down_menu_btn input").eq(0).val(zDropParam.interExpar.exparValue);
        }
    }

	var This = obj;
	$('#fields_popup').css('margin-top',-$('#fields_popup').height()/2);
	$('#fields_popup').show();
	$('#fields_popup').animate({opacity:1},500);

	$('.popup_close').on('click',function(){ //close
		alterData.delPopup();
	});
	$('.popup_btn a:eq(0)').on('click',function(){ //取消
		alterData.delPopup();
	});
	$('.popup_btn a:eq(1)').on('click',function(){ //保存
        if ($("#fieldContent").valid()) {
            alterData.delPopup();//删除弹窗
            alterData.sure()//保存操作
        }
	});
	//删除操作
	alterData.delPopup = function(){
		$('#layer').remove();
		if(dataId==0){
			$(This).parent().parent().parent().removeClass('fields_list_active');
		}else{
			$(This).parent().parent().parent().parent().removeClass('fields_list_active');
		}

		$('#fields_popup').animate({opacity:0},500,function(){
			$('#fields_popup').remove();
		});

	}
	//保存操作
	alterData.sure = function(){
        //将数据暂时保存到外层字段上
        var zDropParam=new Object();
        var inparArray=new Array();
        $("#popup_down_menu1").find(".popup_menu_parent").each(function(){
            var interInparMapper=new Object();
            var interInpar=new Object();
            interInparMapper.interInparCustomField=JSON.parse($(this).find(".down_menu_btn").attr("data-id"));
            interInpar.inparName=$(this).find(".popup_name").text();
            interInpar.inparValue=$(this).find(".popup_name").attr("data-value");
            interInparMapper.interInpar=interInpar;
            inparArray.push(interInparMapper);
        })
        var interExparMapper=new Object();
        var interExparCustomField=new Object();
        var interExpar=new Object();
        var exparArray=new Array();
        interExpar.exparValue=$("#popup_down_menu2").find(".down_menu_btn").attr("data-id");
        interExpar.exparName=$("#popup_down_menu2 #popup_menus0").find("span").eq(0).text();
        zDropParam.inparArray=inparArray; //接口入参映射关系列表
        zDropParam.interExpar=interExpar; //接口出参映射关系
        if(This.attr("data-id")==0){
            zDropParam.interId=This.parent().find(".down_menu_btn").attr("data-id");//接口id
            This.parent().parent().attr("data-value",JSON.stringify(zDropParam));
        }else if(This.attr("data-id")==1){
            zDropParam.interId=This.parent().parent().find(".down_menu_btn").attr("data-id");//接口id
            This.parent().parent().parent().attr("data-value",JSON.stringify(zDropParam));
        }
		$(This).parent().parent().find('.fields_source').append(`
			<div class="add_fields_box">
				<div class="add_fields_title">已添加</div>
				<a href="javaScript:;" class="alter_fields" data-id="1" onclick="alterData.add($(this))">修改</a>
			</div>
		`)
		if(dataId==0){
			$(This).parent().parent().parent().find('.add_fields').remove();
		}
	}

}



//获取接口信息
function initInterList(){
    var interList = new Array();
    $.ajax({
        url : fieldInterList,
        type : "post",
        dataType : "json",
        async : false,
        success : function(data) {
            interList.push({"dataId":"0","name":"请选择"});
            for(var i=0;i<data.length;i++){
                interList.push({"dataId":data[i].id,"name":data[i].name});
            }
        },
        error: function(data) {
            console.log(data);
        }
    });
    return interList;
}
//获取接口输入参数和接口输出参数以及自定义字段
function findFieldZDropInfo(interId){
    var resultData=null;
    $.ajax({
        url : fieldZDropInfo,
        type : "post",
        dataType : "json",
        data : {"interId":interId},
        async : false,
        success : function(data) {
            console.log(JSON.stringify(data));
            resultData=data;
        },
        error: function(data) {
            console.log(data);
        }

    });
    return resultData;
}

//初始化添加字典
function addDictionaryInfo(){
    $(".fields_text").parent().append(`
		<div class="fields_dictionaries">
			<h3 class="dictionaries_title">
			<span>编码</span>
			<span>描述</span>
			</h3>
			<div class="dictionaries_box">`
			+initDictionaryData()+
			`</div>
			<p class="describe">例：输入0001，描述内容</p>
		</div>
    
    `);

}
function initDictionaryData(){
	var html='';
    $.each(data.itemsList,function(index,item){

        if(index==0){
        	html+=`
        	<div class="dictionaries_text">
			<div class="dictionaries_text_input fl" id="typediv">
					<!--<div>-->
					<input type="text" placeholder="请输入字母或数字" value="${item.code}" id="code_${alterData.codeIndex++}" name="code" onkeyup="this.value=this.value.replace(/\\s+/g,'')" />
					<p class="fields_error fields_error7"></p>
					<!--</div>-->
					<!--<div>-->
					<input type="text" placeholder="请输入" value="${item.name}" id="code_dec_${alterData.codeDecIndex++}" name="code_dec" onkeyup="this.value=this.value.replace(/\\s+/g,'')" />
					<p class="fields_error fields_error8"></p>
					<!--</div>-->
					</div>
			<div class="fields_option dictionaries_option fl">
			<a href="javaScript:;" data-id="1" class="fl add_fields_btn" onclick="alterData.dictionaries($(this))">&#xe61f;</a>
			</div>
			</div>       	
        	`;
        }else{
        	html+=`
        	<div class="dictionaries_text">
			<div class="dictionaries_text_input fl" id="typediv">
			<!--<div>-->
					<input type="text" placeholder="请输入字母或数字" value="${item.code}" id="code_${alterData.codeIndex++}" name="code" onkeyup="this.value=this.value.replace(/\\s+/g,'')" />
					<p class="fields_error fields_error7"></p>
					<!--</div>-->
					<!--<div>-->
					<input type="text" placeholder="请输入" value="${item.name}" id="code_dec_${alterData.codeDecIndex++}" name="code_dec" onkeyup="this.value=this.value.replace(/\\s+/g,'')" />
					<p class="fields_error fields_error8"></p>
					<!--</div>-->
			</div>
			<div class="fields_option dictionaries_option fl">
			<a href="javaScript:;" data-id="1" class="fl add_fields_btn" onclick="alterData.dictionaries($(this))">&#xe61f;</a>
			<a href="javaScript:;" data-id="0" class="fr del_fields_btn" onclick="alterData.dictionaries($(this))">&#xe61d;</a>
			</div>
			</div>
        	`;
        }
    })
	return html;
}

function initData(){
	if(data.dataSource==1){
        $(".fields_text").find('.fields_source').append(`
			<div class="add_fields_box">
				<div class="add_fields_title">已添加</div>
				<a href="javaScript:;" class="alter_fields" data-id="1" onclick="alterData.add($(this))">修改</a>
			</div>
		`)
        $(".fields_text .fields_source").find('.add_fields').remove();
	}


    var customField=new Object();
    if(data.type==4){
        addDictionaryInfo();
    }
    if(data.dataSource==1){
        var interData=new Object();
        interData.inparArray=JSON.parse(data.relationParamBean.inparValue);
        interData.interExpar=JSON.parse(data.relationParamBean.exparValue).interExpar;
        interData.interId=data.relationParamBean.interfaceId;
        $(".fields_text").attr("data-value",JSON.stringify(interData))

    }
}



//保存
function save(){
    if(!$("#form1").valid()){return;}
    var customField=new Object();
    var flag=true;
    $("li .fields_text").each(function (index) {
        if($(this).find(".fields_radio a").eq(0).hasClass("radio_acitve")){
            var interMapperJson=$(this).attr("data-value");
            if(interMapperJson==null||""==interMapperJson){
                flag=false;
                aide.alert("第"+(index+1)+"行字段因调用数据源需设置接口信息！");
                return false;
            }
            if(JSON.parse(interMapperJson).interId!=$(this).find(".fields_source .down_menu_btn").attr("data-id")){
                flag=false;
                aide.alert("第"+(index+1)+"行字段因设置的接口改变需重新设置接口信息！");
                return false;
            }
        }

        customField.value=$(this).find("input").eq(1).val();
        customField.name=$(this).find("input").eq(0).val();
        var type=$(this).find(".menu_template_box .down_menu_btn").attr("data-id");
        var items = "";
        if(type==4){
            $(this).parent().find(".fields_dictionaries .dictionaries_text").each(function(){
                var code=$(this).children("div").eq(0).find("input").eq(0).val();
                var des=$(this).children("div").eq(0).find("input").eq(1).val();
                items += code + ":" + des + ",";
            })
        }
        customField.type=type;
        customField.items=items;
        customField.inparAnndExparValue=$(this).attr("data-value");
        customField.id=data.id;
        customField.dicId=data.dicId;
        customField.dataSource=$(this).find(".radio_acitve").attr("data-id")==0?1:0;
    })
    if(!flag){
        return;
    }
    console.log(JSON.stringify(customField));

    $.ajax({
        url:fieldEditSave,
        type:"post",
        data:{
            "param":JSON.stringify(customField)
        },
        async : true,
        success: function(data) {//回调函数，result，返回值
            if(data == 1){
                window.location.href = fieldIndex;
            }else{
                aide.alert("编辑字段失败");
            }
        },
        error:function(){
            aide.alert("编辑字段异常");
        }
    });
}
//校验
alterData.initVerify =function () {
    //字段英文名称唯一
    //页面比对
    $.validator.addMethod("nameIsPageOnly",
        function (value, element) {
            var count = 0,flag = true;

            $(".fields_list").find("input[name=field_name]").each(function(){
                if(value != "" && value != null){
                    if($(this).val() == value){
                        count++;
                    }
                    if(count > 1) {
                        flag = false;
                        return;
                    }
                }
            })
            return flag;
        },"页面上字段名称重复");
    //字段英文名称唯一
    //页面比对
    $.validator.addMethod("isPageOnly",
        function (value, element) {
            var count = 0,flag = true;

            $(".fields_list").find("input[name=en_name]").each(function(){
                if(value != "" && value != null){
                    if($(this).val() == value){
                        count++;
                    }
                    if(count > 1) {
                        flag = false;
                        return;
                    }
                }
            })
            return flag;
        },"页面上英文字段名称重复");
    //跟数据库比对
    $.validator.addMethod("isOnly",
        function(value, element) {
            var onlyFlag = true;
            $.ajax({
                url:fieldCheckValue,
                type:"post",
                data:{ "value":value},
                async : false,
                success: function(data) {//回调函数，result，返回值
                    onlyFlag = data == 0;
                },
                error:function(){
                    aide.alert("验证字段英文名称唯一异常");
                }
            });
            return onlyFlag;
        },
        "英文字段名称已存在");
    //字段英文名称格式校验
    $.validator.addMethod("codeFormat",
        function(value, element) {
            var reg = /^[a-zA-Z0-9]+$/;
            if(reg.test(value)) return true;
            return false;
        },
        "请输入字母或数字");
    //字段名称唯一
    $.validator.addMethod("nameIsOnly",
        function(value, element) {
            var onlyFlag = false;
            $.ajax({
                url:fieldCheckName,
                type:"post",
                data:{ "name":$.trim(value)},
                async : false,
                success: function(data) {//回调函数，result，返回值
                    onlyFlag = data == 0;
                },
                error:function(){
                    aide.alert("验证字段名称唯一异常");
                }
            });
            return onlyFlag;
        },
        "字段名称已存在");
    //字典编码唯一
    $.validator.addMethod("codeIsOnly",
        function(value, element) {
            var onlyFlag = false;
            if($(element).parents(".fields_list").find(".down_menu_btn").attr("data-id")!=4){
                onlyFlag=true;
            }else{
                var count = 0;
                $(element).parents(".dictionaries_box").children("div")
                    .each(function(){
                        if(value==$(this).children("div").eq(0).children("input").eq(0).val()) count++;
                    })
                if(count == 1) onlyFlag = true;
            }
            return onlyFlag;
        },
        "字典编码重复");
    //字典编码必填
    $.validator.addMethod("codeIsNeed",
        function(value, element) {
            var onlyFlag = false;
            if($(element).parents(".fields_list").find(".down_menu_btn").attr("data-id")!=4){
                onlyFlag=true;
            }else{
                if(value!=null&&value!=''){
                    onlyFlag = true;
                }
            }
            return onlyFlag;
        },
        "请输入字典编码");
    //字典描述必填
    $.validator.addMethod("describeIsNeed",
        function(value, element) {
            var onlyFlag = false;
            if($(element).parents(".fields_list").find(".down_menu_btn").attr("data-id")!=4){
                onlyFlag=true;
            }else{
                if(value!=null&&value!=''){
                    onlyFlag = true;
                }
            }
            return onlyFlag;
        },
        "请输入字典描述");

    //字典描述唯一
    $.validator.addMethod("describeIsOnly",
        function(value, element) {
            var onlyFlag = false;
            if($(element).parents(".fields_list").find(".down_menu_btn").attr("data-id")!=4){
                onlyFlag=true;
            }else{
                var count = 0;
                $(element).parents(".dictionaries_box").children("div")
                    .each(function(){
                        if(value==$(this).children("div").eq(0).children("input").eq(1).val()) count++;
                    })
                if(count == 1) onlyFlag = true;
            }
            return onlyFlag;
        },
        "字典描述重复");
    //数据类型
    $.validator.addMethod("dataRequire",
        function (value, element) {
            if (value == 0) {
                return false;
            }
            return true;
        }, "请选择数据类型");
    $.validator.addMethod("fieldRequire",
        function (value, element) {
            if (value == 0) {
                return false;
            }
            return true;
        }, "请选择自定义字段");

    $.validator.addMethod("outRequire",
        function (value, element) {
            if (value == 0) {
                return false;
            }
            return true;
        }, "请选择输出字段");
    //添加用户的校验信息
    $("#form1").validate({
        rules: {
            field_name: {//字段名称
                required : true,
                maxlength: 20,
                // nameIsOnly:true,
                nameIsPageOnly:true
            },
            en_name: {//字段英文名称
                required : true,
                maxlength: 20,
                codeFormat:true,
                // isOnly:true,
                isPageOnly:true
            },
            datatype: {
                dataRequire: true
            },
            code:{
                codeIsNeed : true,
                codeFormat:true,
                maxlength: 20,
                codeIsOnly:true
            },
            code_dec:{
                describeIsNeed : true,
                maxlength: 20,
                describeIsOnly:true
            }
        },
        messages: {
            field_name: {
                required: "请输入字段名称",
                maxlength: "长度不能超过20"
            },

            en_name: {
                maxlength: "长度不能超过20",
                required: "请输入英文名称"
            },
            code:{
                maxlength: "长度不能超过20",
            },
            code_dec:{
                maxlength: "长度不能超过20",
            }
            /* inter_name: {
                 required: "请输入验证码"
             }*/
        },
        errorPlacement: function (error, element) {
            if ($(element).attr("id") == "datatype") {
                $(element).parent().parent().parent().find(".fields_error3").html(error).show();
            }else{
                $(element).next("p").eq(0).html(error).show();
            }
        },
        highlight: function (element, errorClass, validClass) { // element出错时触发
            if ($(element).parent().attr("id") != "typediv") {
                if ($(element).attr("id") == "datatype") {
                    $(element).parent().addClass('fields_error_acitve');
                }else{
                    $(element).addClass('fields_error_acitve');
                }
            }
        },
        unhighlight: function (element, errorClass, validClass) {
            if ($(element).parent().attr("id") != "typediv") {
                if ($(element).attr("id") == "datatype") {
                    $(element).parent().removeClass('fields_error_acitve');
                }else{
                    $(element).removeClass('fields_error_acitve');
                }
            }
        }
    });

    $("#fieldContent").validate({
        onkeyup:false,
        rules: {
            field:{
                fieldRequire:true,
            },
            outField: {
                outRequire:true,
            }
        },
        errorPlacement: function (error, element) {
            $(element).parent().parent().parent().find("p").html(error).show();
        },
        highlight: function (element, errorClass, validClass) { // element出错时触发
            $(element).parent().addClass('fields_error_acitve');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parent().removeClass('fields_error_acitve');
        }
    })
}



