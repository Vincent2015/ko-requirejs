define([ 'jquery', 'knockout', 'text!pages/mgr/advert/verifylist.html' ], function($, ko, template) {

	var infoUrl = "/mgr/advert/adinfo/:id";
	
	var addUrl = '/mgr/advert/adinfo/0';
	
	var deleteUrl = '/mgr/advert/delete/';
	
	var pageUrl = '/mgr/advert/page?page=';
	
	var checkUrl = '/mgr/advert/checkinfo';

	// 添加详细信息页路由
	addRouter(infoUrl);
	
	addRouter(checkUrl+"/:id");
	
	viewModel = {
		data : {
			content : ko.observableArray([]),
			
			totalPages : ko.observable(0),
			number : ko.observable(0)
		},
		searchText : ko.observable(""),
		setData : function(data) {
			this.data.content(data.content);
			this.data.totalPages(data.totalPages);
			this.data.number(data.number + 1);
		},
		infoUrl : infoUrl,
		addUrl : addUrl,
		deleteUrl : deleteUrl,
		pageUrl : pageUrl
	};

	viewModel.add = function(){
		window.router.setRoute(this.addUrl);	
	}
		
	viewModel.del = function() {
		$.ajax({
			type : 'DELETE',
			dataType : 'json',
			async : false,
			url : $ctx + deleteUrl + this.id,
			success : function(data) {
				if (data){
					jAlert('删除成功!')
					var pageNum = viewModel.data.number();
					viewModel.data.content.remove(this);
					viewModel.load(pageNum);
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				jAlert("调用删除服务报错!!");
			}
		});
		
	}
		
	viewModel.load = function(pageIndex){
		
		 var queryData = {};
         $(".form-search").find(".input_search").each(function(){
             queryData[this.name] = this.value;
         });
       
		$.ajax({
			type : 'GET',
			url : $ctx + this.pageUrl + pageIndex,
			data : queryData,
			dataType : 'json',
			success : function(data) {
				viewModel.setData(data);
				$("#pagination").pagination({
					jumppage : false,
					pageSize : false,
					totalPages : viewModel.data.totalPages(),
					currentPage : viewModel.data.number(),
					page : function(page) {
						viewModel.load(page);
					}
				})							
			},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			jAlert("调用服务报错!!");
		}
		});
		
	}
		
	viewModel.searchPage = function() {
		this.load(1);                                                                                          
	}

	viewModel.check = function(){
		window.router.setRoute(checkUrl + "/" + this.id);	
	}
	
	viewModel.fastcheck = function(){
		var infoUrl = $ctx + '/mgr/advert/fastcheck/' + this.id;
		$.ajax({
			type : 'GET',
			url : infoUrl,
			dataType : 'json',
			success : function(data) {
				 alert("通过审核");
				 viewModel.load(viewModel.data.number());
			},
			error : function() {
				jAlert("获取详细信息失败!", "错误");
			}
		});
	}

	var init = function() {
		var pageNum = viewModel.data.number();
		if(pageNum > 0){
			viewModel.load(pageNum);
		} else {
			viewModel.load(1);
		}
	}
	
	return {
		'model' : viewModel,
		'template' : template,
		'init' : init
	};

});