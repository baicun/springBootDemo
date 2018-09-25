//页面模块名称
var checkData = {};
//初始化
checkData.init =function(){
    //生成基本数据信息
    checkData.baseFields({
        /*id:'interface_fields_par'*/
    })

 /*   //生成映射接口字段
    checkData.interfaceFields({
        id:'interface_fields_par'
    })*/

/*	//生成字典表
	checkData.addFieldsTab({
		id:'fields_table',
		allNum:20  //数据长度
	})*/

	
}






//初始化调用
$(document).ready(checkData.init);
//生成字典表

checkData.baseFields = function () {
    var type = data.type;
    var typeTd = "";
    if(type == 1) typeTd ="整数";
    else if(type == 2) typeTd ="小数";
    else if(type == 3) typeTd ="布尔";
    else if(type == 4) typeTd ="字典";
    else if(type == 5) typeTd ="文本";
	$('#check_fields_list').append(`<li><strong>字段名称：</strong><span>`+data.name+`</span></li>
						<li><strong>英文名称：</strong><span>`+data.value+`</span></li>
						<li><strong>创建时间：</strong><span>`+data.creatTime.substring(0,data.creatTime.length-2)+`</span></li>
						<li><strong>数据类型：</strong><span>`+typeTd+`</span></li>`);
	if(type == 4){
        checkData.addFieldsTab({
            id:'fields_table',
        })
	}
	if(data.dataSource==1){
		$('#check_inter_name').append(`<li><strong>接口名称：</strong><span>`+data.iName+`</span></li>`);
        //生成映射接口字段
        checkData.interfaceFields({
            id:'interface_fields_par'
        })
	}
    if(data.dataSource==0){
        $("#interface_fields_par").removeClass("interface_fields_par");
    }



};



checkData.addFieldsTab = function(opt){
	if(!opt.id) return false;
	var obj = '#'+opt.id;
	/*var allNum = opt.allNum || 0; //数据长度*/
    var allNum=data.itemsList.length;
	
	$(obj).append(`<div class="fields_table">
			<h2 class="fields_table_title">字典表</h2>
			<div class="fields_box" id="fields_box">
				<ul class="fields_data_list" id="fields_data_list"></ul>
			</div>
		</div>
	`)
	for(var i=0;i<allNum;i++){
		$('#fields_data_list').append(`<li><strong>`+data.itemsList[i].code+`</strong><span>`+data.itemsList[i].name+`</span></li>`);
	}
	//10条数据以上出现滚动条
	if(allNum>10){
		$('#fields_box').css('height',329);
		//生成滚动条
		$('#fields_box').append(`
			<div class="scroll_parent" id="scroll_parent">
				<div class="scroll_son" id="scroll_son"></div>
			</div>
		`)
		//滚动条滚动
		aide.scroll({
			parentId:'fields_box',
			listId:'fields_data_list',
			scrollParentId:'scroll_parent',
			scrollId:'scroll_son'
		})
	}else{
		$('#fields_box').css('height',allNum*33-1);
	}
};
//生成映射接口字段
checkData.interfaceFields = function(opt){
	if(!opt.id) return false;
	var obj = '#'+opt.id;

	var inparParmList = JSON.parse(data.relationParamBean.inparValue);

	var exparParamList = JSON.parse(data.relationParamBean.exparValue);
	var iSize1 = inparParmList.length;
	var iSize2 = exparParamList.length;
	console.log(exparParamList);
	var maxSize = Math.max(iSize1,iSize2); //取列表最大的长度
	$(obj).append(`
		<h2 class="fields_table_title">映射接口字段</h2>
		<div class="fields_data" id="fields_data">
			<div class="fields_data_title clear">
				<h2 class="fl">
					<span>自定义字段</span>
					<strong>接口输入字段</strong>
				</h2>
				<h2 class="fr">
					<span>自定义字段</span>
					<strong>接口输出字段</strong>
				</h2>
			</div>
			<div class="checkData_fields" id="checkData_fields">
				<div class="checkData_fields_box clear" id="checkData_fields_box">
					<ul class="interface_fields_list fields_checkData_list fl" id="fields_checkData_list1"></ul>
					<ul class="interface_fields_list fields_checkData_list fr" id="fields_checkData_list2"></ul>
				</div>
			</div>
		</div>
	`)
	for(var i=0;i<iSize1;i++){
		$('#fields_checkData_list1').append(`
			<li>
				<span>`+inparParmList[i].interInparCustomField.name+`</span>
				<strong></strong>
				<span>`+inparParmList[i].interInpar.inparName+`</span>
			</li>
		`)
	}

    $('#fields_checkData_list2').append(`
			<li>
				<span>`+exparParamList.interExparCustomField.name+`</span>
				<strong></strong>
				<span>`+exparParamList.interExpar.exparName+`</span>
			</li>
		`)


/*	for(var i=0;i<iSize2;i++){
		$('#fields_checkData_list2').append(`
			<li>
				<span>`+exparParamList[i].interExparCustomField.name+`</span>
				<strong></strong>
				<span>`+exparParamList[i].interExpar.exparName+`</span>
			</li>
		`)
	}*/
	if(maxSize>7){
		$('#checkData_fields').css('height',230);
		$('#fields_data').append(`
			<div class="scroll_parent scroll_parent1" id="scroll_parent1">
				<div class="scroll_son" id="scroll_son1"></div>
			</div>
		`)
		//滚动条滚动
		aide.scroll({
			parentId:'checkData_fields',
			listId:'checkData_fields_box',
			scrollParentId:'scroll_parent1',
			scrollId:'scroll_son1'
		})
	}else{
		$('#checkData_fields').css('height',maxSize*30+20);
	}

};

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
