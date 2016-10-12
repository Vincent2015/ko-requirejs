define([ 'jquery', 'knockout', 'text!pages/emall/shop/registershoplist.html','jcookie' ], function($, ko, template) {

	var infoUrl = "/emall/shop/shopinfo/:id";
	
	var checkinfoUrl = "/emall/shop/shopcheckinfo/:id";
	
	var pageUrl = '/emall/shop/page?page=';
	
	var checkUrl = '/emall/shop/checkinfo/:id';
	
	addRouter(infoUrl);
	addRouter(checkinfoUrl);
	addRouter(checkUrl);
	
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
		pageUrl : pageUrl
	};
	
	viewModel.load = function(pageIndex){
		var queryData = {"search_LIKE_status":0};
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
		window.router.setRoute("/emall/shop/checkinfo/" + this.id);	
	}
	
	var init = function() {
		var pageNum = viewModel.data.number();
		if(pageNum > 0){
			viewModel.load(pageNum);
		} else {
			viewModel.load(1);
		}
	};
	
	return {
		'model' : viewModel,
		'template' : template,
		'init' : init
	};

});