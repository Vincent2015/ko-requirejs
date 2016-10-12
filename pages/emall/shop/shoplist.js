define([ 'jquery', 'knockout', 'text!pages/emall/shop/shoplist.html' ,'jcookie'], function($, ko, template) {

	var infoUrl = "/emall/shop/shopinfo/:id";

	var addUrl = '/emall/shop/shopinfo/0';

	var deleteUrl = '/emall/shop/delete/';

	var pageUrl = '/emall/shop/page?page=';
	
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
					$.showMessage({
						type: "success",
						msg: "删除成功",
						pos: {
							bottom: "30px",
							right: "30px"
						}
					});
					var pageNum = viewModel.data.number();
					viewModel.data.content.remove(this);
					viewModel.load(pageNum);
				}else{
					$.showMessage({
						type: "error",
						msg: "删除失败",
						pos: {
							bottom: "30px",
							right: "30px"
						}
					});
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				jAlert("调用删除服务报错!!");
			}
		});
		
	}
		
	viewModel.load = function(pageIndex){
		var queryData = {"search_LIKE_status":6};
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