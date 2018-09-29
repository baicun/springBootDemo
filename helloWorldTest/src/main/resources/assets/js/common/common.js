//万象智策项目名称
var aide = {};

//时间处理
aide.mindate = "1900-01-01";
aide.maxdate = "2099-12-31";

aide.onOff = false; //滚动条方法中使用
//初始化
aide.init =function(){
	aide.minHeight();  //左侧导航以及页面主体最小高度
	//获取cookie
	aide.getCookie = $.cookie('leftSideBar');
	aide.size = $('.left_sidebar_list li').size()-$('.left_sidebar_ul:eq(1) li').size()-1;
	if(aide.getCookie){
		if(aide.getCookie==0 || aide.getCookie==1 || aide.getCookie==2 ){
			$('.left_sidebar_list li').eq(0).addClass('active');
			$('.left_sidebar_ul').eq(0).show();
			$('.sidebar_li').eq(aide.getCookie).addClass('curr');
		}else {
            $('.left_sidebar_list li').eq(0).removeClass('active');
            $('.left_sidebar_ul').eq(0).hide();
            $('.sidebar_li').eq(aide.getCookie).removeClass('curr');
			if(aide.getCookie==6 || aide.getCookie==7 ){
				$('.left_sidebar_list li').eq(aide.size).addClass('active');
				$('.left_sidebar_ul').eq(1).show();
				$('.sidebar_li').eq(aide.getCookie).addClass('curr');
			}else{
				$('.sidebar_li').eq(aide.getCookie).addClass('active');
			}
		}
	}else{
		$('.left_sidebar_list li').eq(0).addClass('active');
		$('.left_sidebar_ul').eq(0).show();
		$('.sidebar_li').eq(0).addClass('curr');
	}
	//设置cookie
	for(var i=0;i<$('.sidebar_li').size();i++){
		$('.sidebar_li').eq(i).attr('data-id',i);
	}
	$('.sidebar_li').off('click').on('click',function(){
		$.cookie('leftSideBar',$(this).attr('data-id'),{path:'/'});


	})
	//左侧导航菜单
	$('.left_sidebar_h2').off('click').on('click',function(){
		if($(this).parent().find('.left_sidebar_ul').css('display')=='none'){
			$('.left_sidebar_ul').slideUp(200).children('li');
			$('#left_sidebar li').removeClass('active');
			$(this).parent().find('.left_sidebar_ul').slideDown(200).children('li');
			$(this).parent().addClass('active');
		}else{
			$(this).parent().find('.left_sidebar_ul').slideUp(200).children('li');
			$(this).parent().removeClass('active');
		}
	});
	//退出登录
	$('#out_login').off('click').on('click',function(){ 
		aide.layerBlack(); //生成遮罩层
		//生成
		var html =`<p class="popup_text">是否要退出登录?</p>`
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
				window.location.href = loginout;
			},
			cancel:function(oDiv){ //取消
				aide.closeBlack(oDiv);
			}
		});
	});

};
//初始化调用
$(document).ready(aide.init);
//左侧导航以及页面主体最小高度
aide.minHeight = function(){
	aide.resize();
//	$(window).on('resize',function(){
//		aide.resize();	
//	})
};
//左侧导航以及页面主体最小高度
aide.resize = function(){
	var bodyHeight =$(window).height()-$('#header_parent').height();
	$('#left_sidebar').css('min-height',bodyHeight);
	$('#body_content').css('min-height',bodyHeight-90);	
};
//table-下拉菜单
aide.downMenu = function(opt){
	if(!opt.id) return false;
	if(!opt.data) return false;
	var obj = document.getElementById(opt.id);
	var data = opt.data || [];
	var onOff = opt.onOff || false;
	var bool = opt.bool || false;
	var onOff1 = opt.onOff1 || false;
	var Iindex = opt.Iindex || 0;
	var callBack = opt.callBack || function(){};
	var This;
	if(data){
		for(var i=0;i<data.length;i++){
			$(obj).find('.down_menu_list').append('<li data-id='+data[i].dataId+'><a href="javaScript:;">'+data[i].name+'</a></li>');
		}
		if(onOff){
			if(!onOff1){
				$(obj).find('.down_menu_btn span').html(data[Iindex].name);
				$(obj).find('.down_menu_btn input').val(data[Iindex].dataId);
				$(obj).find('.down_menu_btn').attr('data-id',data[Iindex].dataId);
				$(obj).find('.down_menu_list li').removeClass('active');
				$(obj).find('.down_menu_list li').eq(Iindex).addClass('active');	
			}
			if(Iindex==0 && bool==false){
				$(obj).find('.down_menu_btn span').addClass('menu_title_color');
			}else{
				$(obj).find('.down_menu_btn span').removeClass('menu_title_color');
			}
		}else{
			$(obj).find('.down_menu_list li').eq(0).addClass('active');
		}
		if(data.length>5){
			$(obj).find('.down_menu_list').css('max-height','160px');
		}
		$(obj).find('.down_menu_btn span:eq(0)').off('click').on('click',function(ev){
			This = this;
			var listElement = $(obj).find('.down_menu_list');
			var state = $(listElement).css('display');
			$('.down_menu_list').slideUp(200);
			$('.down_menu_btn').removeClass('down_menu_active');
			if(state=='block'){
				$(listElement).slideUp(200);
				$(obj).find('.down_menu_btn').removeClass('down_menu_active');
				if(onOff){
					$(obj).find('.down_menu_btn').removeClass('curr');
				}
			}else{
				$(listElement).slideDown(200);
				$(obj).find('.down_menu_btn').addClass('down_menu_active');
				if(onOff){
					$(obj).find('.down_menu_btn').addClass('curr');
				}
			}
			ev.stopPropagation();
		});
		$(obj).find('.down_menu_list li').off('click').on('click',function(){
			var dataId = $(This).parent().attr('data-id');
			var index = $(obj).find('.down_menu_list li').eq($(this).index()).attr('data-id');
			$(This).parent().attr('data-id',$(this).attr('data-id'));
			$(This).parent().find('input:eq(0)').val($(this).attr('data-id'));
			$(This).parent().removeClass('down_menu_active');
			$(obj).find('.down_menu_list li').removeClass('active');
			$(this).addClass('active');
			if(onOff){
				if(!onOff1){
					if($(this).index()==0 && bool==false){
						$(This).parent().find('span').addClass('menu_title_color');
					}else{
						$(This).parent().find('span').removeClass('menu_title_color');
					}
				}else{
					$(This).parent().find('span').removeClass('menu_title_color');
				}
				$(This).parent().find('span').html($(this).find('a').html());
				$(This).parent().removeClass('curr');
			}
			if(dataId!=index){
				callBack($(this),index); //回调函数
			}
		});	
		$(document).click(function(){
			if(onOff){
				$(This).parent().removeClass('curr');
			}
			$(This).parent().removeClass('down_menu_active');
			$(obj).find('.down_menu_list').slideUp(200);
		});

	}
};
//table排序
aide.sort = function(opt){
	if(!opt.id) return false;
	var obj = document.getElementById(opt.id);
	var oTabId = document.getElementById(opt.tabId);
	var oTbody = oTabId.getElementsByTagName('tbody')[0];
	var aTr = oTbody.getElementsByTagName('tr');
	var callBack = opt.callBack || function(){};
	var onOff = true;
	// dataSort(onOff)
	$(obj).find('span').off('click').on('click',function(){
		var dataId = $(this).attr('data-id');
		if(dataId==0){
			$(this).attr('data-id',1);
			$(this).parent().removeClass('order_active');
			onOff = true;
			// dataSort(onOff);
		}else{
			$(this).attr('data-id',0);
			$(this).parent().addClass('order_active');
			onOff = false;
			// dataSort(onOff);
		}
		callBack(onOff);
    });
	function dataSort(onOff){
		var arr =[];
		for(var i=0;i<aTr.length;i++){
			arr.push(aTr[i]);
		}
		if(onOff){
			arr.sort(function(a,b){
				return new Date(b.getAttribute('data-time')).getTime() - new Date(a.getAttribute('data-time')).getTime();
			});	
		}else{
			arr.sort(function(a,b){
				return new Date(a.getAttribute('data-time')).getTime() - new Date(b.getAttribute('data-time')).getTime();
			});	
		}
		for(var i=0;i<arr.length;i++){
			oTbody.appendChild(arr[i]);
		}
	}
};
//分页
aide.page = function(opt){
	if(!opt.id) return false;
	var obj = document.getElementById(opt.id);
	var nowNum = opt.nowNum || 1;
	var allNum = opt.allNum || 1;
	var sum = opt.sum || 0;
	var onOff = opt.onOff || true;
	var callBack = opt.callBack || function(){};

    var resData = callBack(nowNum,allNum,sum);
     nowNum = resData.pageNum || 1;
     allNum = resData.pages || 5;
     sum = resData.total || 0;

	//清空分页
	$(obj).html('');
	//总条数
	if(onOff){
		$('#page_num span').html(sum);	
	}
	//上一页
	if(nowNum>=2){
		var oA = document.createElement('a');
		oA.href = '#' + (nowNum-1);
		oA.className = 'prev';
		obj.appendChild(oA);
	}
	//当前页码小于等于5
	if(allNum<=5){
		for(var i=1;i<=allNum;i++){
			var oA = document.createElement('a');
			oA.href = '#' + i;
			oA.innerHTML = i;
			if(nowNum == i){
				oA.className = 'active';	
			}else{
				oA.className = '';
			}
			obj.appendChild(oA);
		}
	}else{ //当前页码大于5
		for(var i=1;i<=5;i++){
			var oA = document.createElement('a');
			
			if(nowNum==1 || nowNum==2){ // 开始两位
				oA.href = '#' + i;
				oA.innerHTML = i;
				if(nowNum == i){
					oA.className = 'active';	
				}else{
					oA.className = '';
				}
			}else if((allNum-nowNum)==0 || (allNum-nowNum)==1){ // 结束后两位
				
				oA.href = '#' + (allNum - 5 + i);
				oA.innerHTML = (allNum - 5 + i);
				if((allNum-nowNum)==0 && i==5){
					oA.className = 'active';	
				}else if((allNum-nowNum)==1 && i==4){
					oA.className = 'active';
				}else{
					oA.className = '';
				}

			}else{ //其他
				oA.href = '#' + (nowNum - 3 + i);
				oA.innerHTML = (nowNum - 3 + i);
				if(i == 3){
					oA.className = 'active';	
				}else{
					oA.className = '';
				}	
			}
			obj.appendChild(oA);
		}
	}
	//省略号
	if((allNum-nowNum)>=4 && allNum>=6){
		var oSpan = document.createElement('span');
		obj.appendChild(oSpan);
	}
	//尾页
	if((allNum-nowNum)>=3 && allNum>=6){
		var oA = document.createElement('a');
		oA.href = '#' + allNum;
		oA.className = 'curr1';
		oA.innerHTML = allNum;
		obj.appendChild(oA);
	}
	//下一页
	if((allNum-nowNum)>=1){
		var oA = document.createElement('a');
		oA.href = '#' + (nowNum+1);
		oA.className = 'next';
		obj.appendChild(oA);
	}

	//添加点击事件
	var aA = obj.getElementsByTagName('a');
	for(var i=0;i<aA.length;i++){
		aA[i].onclick = function(){
			var nowNum = parseInt(this.getAttribute('href').substring(1));
			obj.innerHTML = '';
			aide.page({
				id:opt.id,
				sum:sum,
				nowNum:nowNum,
				allNum:allNum,
				callBack:callBack
			})
			return false;
		}
	}
};
//删除修改提示层
aide.tipLayer = function(opt){
	if(!opt.id) return false;
	var onOff = true;
	var oDiv;
	$(opt.oClass).find('span').off('mouseover').on('mouseover',function(){
		if(onOff){
			oDiv = document.createElement('div');
			oDiv.className = oDiv.id = opt.id;
			oDiv.innerHTML = opt.iText;
			oDiv.style.left = $(this).offset().left - opt.left + 'px';
			oDiv.style.top = $(this).offset().top - opt.top + 'px';
			$('body').append(oDiv);	
		}
		onOff = false;
	}).off('mouseout').on('mouseout',function(){
		oDiv.remove();
		onOff = true;
	})
};
//table-移入变色
aide.tabBackground = function(opt){
	if(!opt.id) return false;
	var obj = document.getElementById(opt.id);
	var oTbody = obj.getElementsByTagName('tbody')[0];
	
	for(var i=0;i<$(oTbody).find('tr').size();i++){
		$(oTbody).find('tr').eq(i).hover(function(){
			$(this).addClass('curr');
		},function(){
			$(this).removeClass('curr');
		})
	}
	
};
//创建弹窗    
aide.popupCreate = function(opt){
	if(!opt.id) return false;
	var obj ='#'+opt.id;
	var title = opt.title || '';
	var html = opt.html || '';
	$('body').append(`<div class="popup_box popup_box1 ${opt.id}" id="${opt.id}"></div>`);
	$(obj).append(`
		<div class="popup_title">
			<span>${title}</span>
	        <a href="javaScript:;" class="popup_close">&#xe617;</a>
	    </div>
	`);
	$(obj).append(html);
	$(obj).append(`
		<div class="popup_btn">
	    	<a href="javaScript:;" class="popup_cancel">取消</a>
	    	<a href="javaScript:;" class="popup_sure">确定</a>
	    </div>
	`);

};
//弹窗操作
aide.popupOption = function(opt){
	if(!opt.id) return false;
	var obj = document.getElementById(opt.id);
	var sure = opt.sure || function(){};
	var cancel = opt.cancel || function(){};
	var close = opt.close || function(){};
	$(obj).show();
	$(obj).animate({opacity:1},500);
	$(obj).find('.popup_close').off('click').on('click',function(){ //关闭
		close(obj);
	});
	$(obj).find('.popup_sure').off('click').on('click',function(){ //确认
		sure(obj);
	});
	$(obj).find('.popup_cancel').off('click').on('click',function(){ //取消
		cancel(obj);
	});	
};	
//遮罩层-黑色
aide.layerBlack = function(){
	$('body').append('<div class="layer1" id="layer1"></div>');
	$('#layer1').show();
};
//关闭弹窗-黑色
aide.closeBlack = function(obj){
	$(obj).animate({opacity:0},500,function(){
		$(obj).remove();
		$('#layer1').remove();
	});
};
//隐藏弹窗-黑色
aide.closeBlackHide = function(obj){
	$(obj).animate({opacity:0},500,function(){
		$(obj).hide();
		$('#layer1').remove();
	});
};
//遮罩层-白色
aide.layerWhite = function(){
	$('body').append('<div class="layer" id="layer"></div>');
	$('#layer').show();
};
//关闭弹窗-白色
aide.closeWhite = function(obj){
	$(obj).animate({opacity:0},500,function(){
		$(obj).remove();
		$('#layer').remove();
	});
};
//隐藏弹窗-白色
aide.closeWhiteHide = function(obj){
	$(obj).animate({opacity:0},500,function(){
		$(obj).hide();
		$('#layer').remove();
	});
};
//弹窗位置
aide.loaction = function(opt){
	if(!opt.id) return false;
	var obj = '#'+opt.id;
	var top = opt.top || 0;
	var left = opt.left || 0;
	$(obj).css('top',top);
	$(obj).css('left',left);
}
//格式化日期
//yyyy-MM-dd HH:mm:ss
aide.formatDateTime = function (date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    function toDouble(num){
		return num<10?'0'+num:''+num;
	}
    var str = toDouble(y) + '-' + toDouble(m) + '-' + toDouble(d) + ' ' + toDouble(h) + ':' + toDouble(minute) + ':' + toDouble(second);
    return str;  
}
//yyyy-MM-dd
aide.formatDate = function (date) {

    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    function toDouble(num){
        return num<10?'0'+num:''+num;
    }
    var str = toDouble(y) + '-' + toDouble(m) + '-' + toDouble(d);
    return str;
}
//不为空
aide.notNull = function (data) {
    if (null != data && "" != data && undefined != typeof(data)) {
        return data;
    } else {
        return "--";
    }
}

//返回时间  isSeconds:  true:输入的时间的是毫秒    false（默认）：输入的是日期字符串
aide.notNullOfDateTime = function (data, isSeconds) {
    if (null != data && "" != data && undefined != typeof(data)) {
    	var dateStr = data;
    	if (!isSeconds) {
    		dateStr = data.replace(/-/g, "/");
            dateStr = dateStr.slice(0,dateStr.indexOf("."));
        }
        return aide.formatDateTime(new Date(dateStr));
    } else {
        return "--";
    }
}
//返回日期 isSeconds:  true:返回的是毫秒    false（默认）：日期
aide.notNullOfDate = function (data, isSeconds) {
    if (null != data && "" != data && undefined != typeof(data)) {
        var dateStr = data;
        if (!isSeconds) {
        	dateStr = data.replace(/-/g, "/");
            dateStr = dateStr.slice(0, dateStr.indexOf("."));
        }
        return aide.formatDate(new Date(dateStr));
    } else {
        return "--";
    }
}

//自定义滚动条
aide.scroll = function(opt){
	if(!opt.parentId) return false;
	var oParent =document.getElementById(opt.parentId);
	var oList =document.getElementById(opt.listId);
	var oScrollParent =document.getElementById(opt.scrollParentId);
	var oScroll =document.getElementById(opt.scrollId);
	var onOff = opt.onOff || false;
	var disY =0;
	var bBtn = true;
	
	oScroll.onmousedown =function(ev){
		var oEvent = ev || event;
		if(onOff){
			disY =oEvent.clientX -oScroll.offsetLeft;
		}else{
			disY =oEvent.clientY -oScroll.offsetTop;
		}
		document.onmousemove =function(ev){
			var oEvent =ev || event;
			if(onOff){
				var T =oEvent.clientX -disY;
			}else{
				var T =oEvent.clientY -disY;
			}
			t(T);
			document.onmouseup =function(){
				document.onmousemove =null;
			};
		};
		if(aide.onOff){
			$('.down_menu_list').remove();
			rulePublic.onOff = true;
			rulePublic.onOff1 = true;
			$('.down_menu_btn').removeClass('curr');
			$('.down_menu_btn').attr('data-id',0);
		}
		return false;
	};
	if(oParent.addEventListener){
		oParent.addEventListener('DOMMouseScroll',show,false);
	}
	oParent.onmousewheel =show;
	function show(ev){
		
		if(aide.onOff){
			$('.down_menu_list').remove();
			rulePublic.onOff = true;
			rulePublic.onOff1 = true;
			$('.down_menu_btn').removeClass('curr');
			$('.down_menu_btn').attr('data-id',0);
		}
		
		var oEvent =ev || event;
		var T = 0;
		if(ev.detail){
			bBtn = oEvent.detail>0 ? true : false;
		}else{
			bBtn = oEvent.wheelDelta<0 ? true : false;
		}
		if(bBtn){
			if(onOff){
				T = oScroll.offsetLeft + 8;
			}else{
				T = oScroll.offsetTop + 8;
			}
		}else{
			if(onOff){
				T = oScroll.offsetLeft - 8;
			}else{
				T = oScroll.offsetTop - 8;
			}	
		}
		t(T);
		
		if(oEvent.preventDefault){
			oEvent.preventDefault();
		}else{
			return false;
		}
	}
	function t(T){
		if(onOff){
			if(T<0){
				T=0;
			}else if(T>oParent.offsetWidth-oScroll.offsetWidth){
				T=oParent.offsetWidth-oScroll.offsetWidth;
			}
			oScroll.style.left = T+'px';
			var scale = T/(oScrollParent.offsetWidth-oScroll.offsetWidth);
			oList.style.left = -scale * (oList.offsetWidth-oParent.offsetWidth) + 'px';	
		}else{
			if(T<0){
				T=0;
			}else if(T>oParent.offsetHeight-oScroll.offsetHeight){
				T=oParent.offsetHeight-oScroll.offsetHeight;
			}
			oScroll.style.top = T+'px';
			var scale = T/(oScrollParent.offsetHeight-oScroll.offsetHeight);
			oList.style.top = -scale * (oList.offsetHeight-oParent.offsetHeight) + 'px';
		}
		
	}
};
//选项卡组件
aide.tabControl = function(opt){
	if(!opt.id) return false;
	var obj = '#'+opt.id;
	var oSclass = opt.sClass || 'active';
	var callBack = opt.callBack || function(){};

	$(obj).find('li').off('click').on('click',function(){
		$(obj).find('li').removeClass(oSclass);
		$(this).addClass(oSclass);
		callBack($(this),$(this).index());
	})
	
	
}
//用户权限
aide.checkUserAuth = function(auth) {
    if (authPathArr.length < 1) {return false;}
    for (let i = 0; i < authPathArr.length; i++) {
        if (authPathArr[i].authority == auth){
            return true;
        }
    }
    return false;
}
aide.judgeAuth = function (auth) {
	var res = aide.checkUserAuth(auth);
	// return res ? "" : "style='display: none;'";
	return res ? "" : "hidden='hidden'";
    // if (authPathArr.length < 1) {return "style='display: none;'";}
    // for (let i = 0; i < authPathArr.length; i++) {
    //     if (authPathArr[i].authority == auth){
    //         return "";
    //     }
    // }
    // return "style='display: none;'";
}
//alert
aide.alert = function(opt){
	var onOff = opt.onOff || false;
	var sure = opt.sure || function(){};
	var cancel = opt.cancel || function(){};
	var textHtml;
	var html;
	
	if(onOff){
		html =`<div class="popup_btn">
					<a href="javaScript:;" class="popup_cancel">取消</a>
			    	<a href="javaScript:;" class="popup_sure">确定</a>
			    </div>`	
		textHtml = opt.text;
	}else{
		html =`<div class="popup_btn popup_btn1">
			    	<a href="javaScript:;" class="popup_sure">确定</a>
			    </div>`
		textHtml = opt;
	}
	
	if(opt){
		$('body').append(`
			<div class="alert_layer" id="alert_layer"></div>
			<div class="alert_popup" id="alert_popup">
				<p class="popup_text">${textHtml}</p>
				${html}	
			</div>
		`);	
	}
	//确定
	$('.popup_sure').off('click').on('click',function(){
		$('#alert_layer').remove();
		$('#alert_popup').remove();
		sure();
	})
	//取消
	$('.popup_cancel').off('click').on('click',function(){
		$('#alert_layer').remove();
		$('#alert_popup').remove();
		cancel();
	})
	
}