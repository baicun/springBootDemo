var roleManage = {};
//角色权限选择
roleManage.role = function(){
	// $('.role_box_list span').attr('class','active1');
	//权限列表展开收缩
	$('.role_icon').off('click').on('click',function(){
		if($(this).parent().siblings('ul').css('display')=='none'){
			$(this).parent().siblings('ul').slideDown(100).children('li');
			$(this).removeClass('curr');
		}else{
			$(this).parent().siblings('ul').slideUp(100);
			$(this).addClass('curr');
		}
	});
	//父级全选操作
	$('.role_title span').off('click').on('click',function(){
		var aClass =$(this).attr('class');
		if(aClass=='active'){
			$(this).parent().parent().find('span').attr('class','active1');
			$(this).parent().parent().find('.role_error').show();
		}else{
			$(this).parent().parent().find('span').attr('class','active');
			$(this).parent().parent().find('.role_error').hide();
		}
	});
	//第一级权限
	$('.role_title_one span').off('click').on('click',function(){
		var aClass =$(this).attr('class');
		var oParent3 = $(this).parent().parent().parent();
		var oParent4 = $(this).parent().parent().parent().parent();
		
		if(aClass=='active'){
			$(this).attr('class','active1');
			for(var i=0;i<$(oParent3).find('.role_title1').size();i++){
				if($(oParent3).find('.role_title_one span').eq(i).attr('class')=='active1'){
					$(oParent4).find('span').eq(0).attr('class','active1');
				}
			}
			$(this).parent().next().find('span').attr('class','active1');
			$(this).parent().parent().find('.role_error').show();
		}else{
			$(this).attr('class','active');
			for(var i=0;i<$(oParent3).find('.role_title1').size();i++){
				if($(oParent3).find('.role_title_one span').eq(i).attr('class')=='active1'){
					$(oParent4).find('span').eq(0).attr('class','active1');
					break;
				}else{
					$(oParent4).find('span').eq(0).attr('class','active');
				}
			}
			$(this).parent().next().find('span').attr('class','active');
			$(this).parent().parent().find('.role_error').hide();
		}
	});
	//第二级权限
	$('.role_title_two span').off('click').on('click',function(){
		var aClass =$(this).attr('class');
		var oParent3 = $(this).parent().parent().parent();
		var oParent4 = $(this).parent().parent().parent().parent();
		var oParent6 = $(this).parent().parent().parent().parent().parent().parent();

		if(aClass=='active'){
			$(this).attr('class','active1');
			for(var i=0;i<$(oParent3).find('.role_title_two').size();i++){
				if($(oParent3).find('.role_title_one span').eq(i).attr('class')=='active1'){
					$(oParent4).find('span').eq(0).attr('class','active');
				}else{
					$(oParent4).find('span').eq(0).attr('class','active1');
					break;
				}
			}
			$(this).parent().next().find('span').attr('class','active1');
			$(this).parent().parent().find('.role_error').show();
			for(var i=0;i<$(oParent4).parent().find('.role_title_one').size();i++){
				if($(oParent4).parent().find('.role_title_one span').eq(i).attr('class')=='active1'){
					$(oParent6).find('span').eq(0).attr('class','active');
				}else{
					$(oParent6).find('span').eq(0).attr('class','active1');
					break;
				}
			}
		}else{
			$(this).attr('class','active');
			for(var i=0;i<$(oParent3).find('.role_title_two').size();i++){
				if($(oParent3).find('.role_title_two span').eq(i).attr('class')=='active1'){
					$(oParent4).find('span').eq(0).attr('class','active1');
					break;
				}else{
					$(oParent4).find('span').eq(0).attr('class','active');
				}
			}
			$(this).parent().next().find('span').attr('class','active');
			$(this).parent().parent().find('.role_error').hide();
			for(var i=0;i<$(oParent4).parent().find('.role_title_one').size();i++){
				if($(oParent4).parent().find('.role_title_one span').eq(i).attr('class')=='active1'){
					$(oParent6).find('span').eq(0).attr('class','active1');
					break;
				}else{
					$(oParent6).find('span').eq(0).attr('class','active');
				}
			}
	
		}
	});
	//最后一级
	$('.sublevel span').off('click').on('click',function(){
		var aClass = $(this).attr('class');
		var oParent2 = $(this).parent().parent();
		var oParent4 = $(this).parent().parent().parent().parent();
		var oParent5 = $(this).parent().parent().parent().parent().parent();
		var num = $(this).parent().parent().attr('data-id');
		if(aClass=='active'){
			$(this).attr('class','active1');
			if($(oParent2).attr('class')=='role_box_list1'){
				for(var i=0;i<$(oParent2).find('span').size();i++){
					if($(oParent2).find('span').eq(i).attr('class')=='active1'){
						$(oParent2).parent().find('span').eq(0).attr('class','active1');
					}
				}	
			}
			if($(oParent2).attr('class')=='role_box_list3'){
				for(var i=0;i<$(oParent2).find('span').size();i++){
					if($(oParent2).find('span').eq(i).attr('class')=='active1'){
						$(oParent2).parent().find('span').eq(0).attr('class','active1');
					}
				}
				for(var i=0;i<$(oParent2).parent().parent().find('.role_title_two').size();i++){
					if($(oParent2).parent().parent().find('.role_title_two span').eq(i).attr('class')=='active1'){
						$(oParent5).find('span').eq(0).attr('class','active1');
						break;
					}else{
						$(oParent5).find('span').eq(0).attr('class','active');
					}
				}
				for(var i=0;i<$(oParent5).parent().find('.role_title_one').size();i++){
					if($(oParent5).parent().find('.role_title_one span').eq(i).attr('class')=='active1'){
						$(oParent5).parent().parent().find('span').eq(0).attr('class','active1');
						break;
					}else{
						$(oParent5).parent().parent().find('span').eq(0).attr('class','active');
						
					}
				}
			}
			if($(oParent2).attr('class')=='role_box_list2'){
				for(var i=0;i<$(oParent2).find('span').size();i++){
					if($(oParent2).find('span').eq(i).attr('class')=='active1'){
						$(oParent2).prev().find('span').attr('class','active1');
					}
				}
				for(var i=0;i<$(oParent4).find('.role_title_one').size();i++){
					if($(oParent4).find('.role_title_one span').eq(i).attr('class')=='active1'){
						$(oParent4).parent().find('span').eq(0).attr('class','active1');
						break;
					}else{
						$(oParent4).parent().find('span').eq(0).attr('class','active');
					}
				}
			}
			for(var i=0;i<$(oParent2).find('span').size();i++){
				if($(oParent2).find('span').eq(i).attr('class')=='active1'){
					$(oParent2).find('.role_error').show();
					
				}else{
					$(oParent2).find('.role_error').hide();
					break;
				}
			}
			
		}else{
			$(this).attr('class','active');
			if($(oParent2).attr('class')=='role_box_list1'){
				for(var i=0;i<$(oParent2).find('span').size();i++){
					if($(oParent2).find('span').eq(i).attr('class')=='active1'){
						$(oParent2).parent().find('span').eq(0).attr('class','active1');
						break;
					}else{
						$(oParent2).parent().find('span').eq(0).attr('class','active');
					}
				}	
			}
			if($(oParent2).attr('class')=='role_box_list3'){
				for(var i=0;i<$(oParent2).find('span').size();i++){
					if($(oParent2).find('span').eq(i).attr('class')=='active1'){
						$(oParent2).parent().find('span').eq(0).attr('class','active1');
						break;
					}else{
						$(oParent2).parent().find('span').eq(0).attr('class','active');
					}
				}
				for(var i=0;i<$(oParent2).parent().parent().find('.role_title_two').size();i++){
					if($(oParent2).parent().parent().find('.role_title_two span').eq(i).attr('class')=='active1'){
						$(oParent5).find('span').eq(0).attr('class','active1');
						break;
					}else{
						$(oParent5).find('span').eq(0).attr('class','active');
					}
				}
				for(var i=0;i<$(oParent5).parent().find('.role_title_one').size();i++){
					if($(oParent5).parent().find('.role_title_one span').eq(i).attr('class')=='active1'){
						$(oParent5).parent().parent().find('span').eq(0).attr('class','active1');
						break;
					}else{
						$(oParent5).parent().parent().find('span').eq(0).attr('class','active');
					}
				}
			}
			if($(oParent2).attr('class')=='role_box_list2'){
				for(var i=0;i<$(oParent2).find('span').size();i++){
					if($(oParent2).find('span').eq(i).attr('class')=='active1'){
						$(oParent2).prev().find('span').attr('class','active1');
						break;
					}else{
						$(oParent2).prev().find('span').attr('class','active');
					}
				}
				for(var i=0;i<$(oParent4).find('.role_title_one').size();i++){
					if($(oParent4).find('.role_title_one span').eq(i).attr('class')=='active1'){
						$(oParent4).parent().find('span').eq(0).attr('class','active1');
						break;
					}else{
						$(oParent4).parent().find('span').eq(0).attr('class','active');
					}
				}
			}
			$(oParent2).find('.role_error').hide();
		}
	});
}
roleManage.getId = function(){
	var arrId = [];
	for(var i = 0;i<$('.role_box_list span').size();i++){
		if($('.role_box_list span').eq(i).attr('class')=='active'){
			var dataid = $('.role_box_list span').eq(i).attr('data-id');
			if (null != dataid && undefined != typeof(dataid) && '' != dataid) {
                arrId.push(dataid);
            }
		}
	}
	return arrId;
}		