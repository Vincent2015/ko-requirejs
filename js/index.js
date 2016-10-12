require(['jquery', 'knockout', 'bootstrap', 'ujs', 'director'], function($, ko) {
	'use strict';
	window.addRouter = function(path, func) {
		var pos = path.indexOf('/:');
		var truePath = path;
		if (pos !== -1)
			truePath = path.substring(0,pos);
		func = func || function() {
					var params = arguments;
					initPage('pages' + truePath,params);
				};
		var tmparray = truePath.split("/");
		if(tmparray[1] in router.routes && tmparray[2] in router.routes[tmparray[1]] && tmparray[3] in router.routes[tmparray[1]][tmparray[2]]){
			return;
		}else{
			router.on(path, func);
		}
	};

	window.router = Router();
	var initMenuTree = function(){
		$('#show_side').click(function() {
			var $leftpanel = $('.leftpanel');
			//展开
			if ($leftpanel.hasClass('leftpanel-collapse')) {
				$leftpanel.removeClass('leftpanel-collapse');
				$('.content').removeClass('content-collapse');
				$('.left-menu').children('li').children('a').children('.title').show();
				$('.left-menu').children('li').children('a').children('.arrow').show();
			} else {
				//合闭
				$leftpanel.addClass('leftpanel-collapse');
				$('.content').addClass('content-collapse');
				$('.left-menu').children('li').children('a').children('.title').hide();
				$('.left-menu').children('li').children('a').children('.arrow').hide();
				$('.left-menu').children('li.open').children('a').children('.arrow').removeClass('open').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-left');
				$('.left-menu').children('li.open').children('a').children('.arrow').removeClass('active');
				$('.left-menu').children('li.open').children('.sub-menu').slideUp(200);
			}
		});

		$('.left-menu li > a').on('click', function(e) {
			if ($(this).children('.title').length > 0 && !$(this).children('.title').is(':visible')) {
				$('#show_side').click();
			}
			if ($(this).next().hasClass('sub-menu') === false) {
				return;
			}
			var parent = $(this).parent().parent();
			parent.children('li.open').children('a').children('.arrow').removeClass('open').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-left');
			parent.children('li.open').children('a').children('.arrow').removeClass('active');
			parent.children('li.open').children('.sub-menu').slideUp(200);
			parent.children('li').removeClass('open');
			//  parent.children('li').removeClass('active');

			var sub = $(this).next();
			if (sub.is(":visible")) {
				$('.arrow', $(this)).removeClass("open").removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-left');
				$(this).parent().removeClass("active");
				sub.slideUp(200);
			} else {
				$('.arrow', $(this)).addClass("open").removeClass('glyphicon-chevron-left').addClass('glyphicon-chevron-down');
				$(this).parent().addClass("open");
				sub.slideDown(200);
			}

			e.preventDefault();
		});
	};

	$(function(){

		$.ajax({
			type : 'GET',
			url : $ctx + "/mgr/menu/rootmenu",
			data : '',
			dataType : 'json',
			success : function(data) {
				initFuncTree(data);
			}
		});

		$('.left-menu').find("a[href*='#']").each(function() {
			var path = this.hash.replace('#', '');
			addRouter(path);
		});

		window.router.init();
	})

	var initFuncTree = function(menuData){
		if(menuData.id == 0){
			var rootMenuArray = menuData.children;
			for (var i = 0; i < rootMenuArray.length; i++) {
				var menu = rootMenuArray[i];
				var liObj = $("<li class=\"\">");
				var aObj = $("<a href=\"javascript:;\"> <i class=\"fa fa-file-text\"></i> <span class=\"title\">"+menu.funcName+"</span> <span class=\"arrow glyphicon glyphicon-chevron-left\"></span> </a>");
				var ulObj = $("<ul class=\"sub-menu\">");
				if(menu.children.length > 0){
					for (var j = 0; j < menu.children.length; j++) {
						var subMenuObj = menu.children[j];
						var subLiObj = $("<li> <a href=\"#"+ subMenuObj.funcUrl +"\" >"+ subMenuObj.funcName +"</a> </li>");
						$(ulObj).append(subLiObj);
					}
				}
				$(liObj).append(aObj).append(ulObj);
				$(".left-menu").append(liObj);
			}
		}
		initMenuTree();

		$('.left-menu').find("a[href*='#']").each(function() {
			var path = this.hash.replace('#', '');
			if(typeof(path)!= "undefined" && path != "" && path!="null"){
				addRouter(path);
			}
		});
	}

	function initPage(p, params) {
		if( p == 'pages'){ return ;} //没有指定页面，不进行数据加载
		var module = p;
		requirejs.undef(module);
		cleanDirty();
		if (params.length == 1)
			params = params[0]
		require([module], function(module) {
			if(module == undefined ){
				jAlert('会话可能过期，请重新登录!!', '提示',function(){document.location.href=$ctx+"/";});
				return ;
			}

			ko.cleanNode($('.content')[0]);
			$('.content').html('');
			$('.content').html(module.template);
			ko.applyBindings(module.model, $('.content')[0]);
			module.init(params);
		})
	}

	function cleanDirty(){
		$('[role=tooltip]').remove();
	};

	window.ajaxAuthTimeout = function(XMLHttpRequest, textStatus, errorThrown){
		var msg_json = 'auth check error!' ;  //当返回数据为json格式时候，
		var msg_txt= '{"msg":"auth check error!"}'  ; //当返回数据为 txt格式时候
		var return_info ;
		if(XMLHttpRequest.responseJSON ==undefined){
			return_info = XMLHttpRequest.responseText ;
		}else{
			return_info = XMLHttpRequest.responseJSON.msg
		}
		if(XMLHttpRequest.status ==306  &&
				( return_info == msg_json || return_info ==msg_txt   )  ){
			jAlert('会话时间过期，请重新登录!!', '提示',function(){document.location.href=$ctx+"/";});
		}

		//没有权限提示
		var status = XMLHttpRequest.getResponseHeader("errorStatus")
		if( status =='501'){
			alertErrorInfo('没有此操作权限') ;
		}
	}

	/**统一设置ajax的参数信息，当状态返回为306时候，说明会话时间过期，需要重新登录,当自定义complete方法是，此方法被覆盖 */
	$(function(){
		$.ajaxSetup({
			complete: function (xhr, status) {
				ajaxAuthTimeout(xhr, status) ;
			}
		}) ;
	})


	//提示信息框
	window.alertErrorInfo = function(message){//显示后台返回   失败信息
		if(message==undefined || message==null || message=='undefined'){
			message="操作失败" ;
		}
		$.showMessage({
			type: "warning",
			msg: message,
			pos: {
				bottom: "30px",
				right: "30px"
			}
		});
	}

	window.alertSuccessInfo = function(message){//显示后台返回   成功信息
		if(message==undefined || message==null || message=='undefined'){
			message="操作成功" ;
		}
		$.showMessage({
			type: "success",
			msg: message,
			pos: {
				bottom: "30px",
				right: "30px"
			}
		});
	}

	window.alertDangerInfo = function(message){//显示后台返回   失败信息
		if(message==undefined || message==null || message=='undefined'){
			message="操作异常" ;
		}
		$.showMessage({
			type: "danger",
			msg: message

		});
	}

});


 