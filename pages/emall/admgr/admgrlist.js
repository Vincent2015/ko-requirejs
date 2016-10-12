define([ 'jquery', 'knockout', 'text!pages/emall/admgr/admgrindex.html','jcookie' ],function($, ko, template) {

	var infoUrl = "/emall/admgr/admgrinfo/:id";
	
	var addUrl = '/emall/admgr/admgrinfo/0';
	
	var deleteUrl = '/emall/admgr/delete/';
	
	var pageUrl = '/emall/admgr/page?page=';
	
	// 添加详细信息页路由
	addRouter(infoUrl);
	
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
	};
	
	viewModel.showAdmgrInfo = function() {
		window.router.setRoute(infoUrl);
	},
		
	viewModel.del = function() {
		$.ajax({
			type : 'DELETE',
			dataType : 'json',
			async : false,
			url : $ctx + deleteUrl + this.id,
			success : function(data) {
				if (data){
					alertSuccessInfo("删除成功") ;
					 
					var pageNum = viewModel.data.number();
					viewModel.data.content.remove(this);
					viewModel.load(pageNum);
				}else{
					alertErrorInfo("删除失败") ;
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
//				jAlert("调用删除服务报错!!");
				alertDangerInfo("调用删除服务报错!!") ;
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
//				jAlert("调用服务报错!!");
				alertDangerInfo("调用服务报错!!") ;
			} 
		});
		
	}
		
	viewModel.searchPage = function() {
		this.load(1);                                                                                          
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