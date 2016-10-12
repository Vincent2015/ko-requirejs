define([ 'jquery', 'knockout', 'text!pages/emall/goods/goodindex.html','jcookie' ],function($, ko, template) {

	var infoUrl = "/emall/goods/goodinfo/:id";
	
	var addUrl = '/emall/goods/goodinfo/0';
	
	var deleteUrl = '/emall/goods/delete/';
	
	var pageUrl = '/emall/goods/page?page=';
	
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
	};
		
	viewModel.del = function() {
		var cfm=confirm("确认删除");
		{
			if (cfm == true) {
				$.ajax({
					type : 'DELETE',
					dataType : 'json',
					async : false,
					url : $ctx + deleteUrl + this.id,
					success : function(data) {
						if (data) {
//							jAlert('删除成功!',"提示")
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
							
							 if(viewModel.data.content._latestValue.length>1)
							     viewModel.load(pageNum);
								 else
								 viewModel.load((pageNum-1));

						}else{
							$.showMessage({
								type: "warning",
								msg: "删除失败",
								pos: {
									bottom: "30px",
									right: "30px"
								}
							});
						}
					},
					error : function() {
						jAlert("调用删除服务报错!!","错误");
						
					}
				});
			}
		}

		
	}
		
	viewModel.load = function(pageIndex){
	    $('#markedAll').attr('checked',false) ;//加载数据前对  全选复选框  去掉选中状态（如果选中的话）
	    if(pageIndex <=0 ){
	    	pageIndex =1 ;
	    }
	    
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
				    first: null,
				    last: null,
					page : function(page) {
						if(page > 20) {
							jAlert("商品维护只支持前20页翻页，请输入其他查询条件搜索!!","提示");
							return;
						}
						viewModel.load(page);
					}
				})				
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				jAlert("调用服务报错!!","错误");
			}
		});
		
	}
		
	viewModel.searchPage = function() {
		this.load(1);                                                                                          
	}
	
	
	// 推荐
	viewModel.recommend = function() {
		var id = this.id;
		var name = this.goodName;
		$.ajax({
			type : 'GET',
			dataType : 'json',
			async : false,
			url : $ctx + '/mgr/advert/recommend/' + id + '?type=' + 2,
			success : function(data) {
				if (data) {
					 alertSuccessInfo() ;
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alertDangerInfo("推荐异常") ;
			}
		});

	};
	
	 
	
	viewModel.createStaticHtml = function(){
		var id = this.id;
		$.ajax({
			type : 'GET',
			async : false,
			url : $ctx + '/offlineshtml/detail_html?id=' + id  ,
			success : function(data) {
				if (data) {
//					alert("调用生成静态页完成!");
					alertSuccessInfo("调用生成静态页完成!") ;
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
//				jAlert("调用生成静态页报错!!", "错误");
				alertDangerInfo("调用生成静态页报错!!") ;
			}
		});
	}
	
	//调用OfflineShtmlController.java
	viewModel.redisShardedDemo = function(){ 
		var id = this.id;
		$.ajax({
			type : 'GET',
			async : false,
			url : $ctx + '/offlineshtml/redisShardedDemo', 
			success : function(data) {
				if (data) {
//					alert("redis分片demo完成" );
					alertSuccessInfo("redis分片demo完成" ) ;
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
//				jAlert("redis分片demo失败!", "错误");
				alertDangerInfo("redis分片demo失败!") ;
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
	
	// 选择列表中的checkbox
	viewModel.selectSingle= function(){
		var $sub=$("input[name='marked']");
		$('#markedAll').prop("checked",$sub.length==$sub.filter(":checked").length?true:false);
	}
	
	
	// 选择选中全部或取消选中全部
	viewModel.selectAll = function() {
		$("input[name='marked']").prop("checked",$('#markedAll').prop('checked') );
	}
	
	//确定是否有选中信息
	viewModel.haschecked =function(){
		var cnt = $("input[name='marked']").filter(":checked").length ;
		if( cnt == 0){
			alert("没有选中任何信息!");
			return false;
		}
		return true;
	}
	 
	// 选择列表中的checkbox
	viewModel.getmarked  =  function(){
		var str = '';
		$("input[name='marked']").filter(":checked").each(function(){
			if( $(this).prop('checked') ){
				str += $(this).val() + ',' ;
			}
		}) ;
		return str.substring(0, str.length-1);
	}
	
	
	viewModel.delBatch=  function(){
		if( !this.haschecked() ){
			return ;
		}
		var cfm=confirm("确认删除？")
		if( !cfm ){
			return ;
		}
	    var marked = this.getmarked() ;
	    var params = {
	    		"ids": marked
	    }
		$.ajax({
			type : 'GET',
			async : false,
			data: jQuery.param(params),
			url :"emall/goods/deleteBatch",
			success : function(data) {
				if (data==true) {
//					alert("删除成功!");
					$.showMessage({
						type: "success",
						msg: "删除成功",
						pos: {
							bottom: "30px",
							right: "30px"
						}
					});
					 var pageNum = viewModel.data.number();
					 if( $('#markedAll').prop('checked') ){
						 viewModel.data.content.removeAll() ;
					 }
					 
					 if(viewModel.data.content._latestValue.length>1)
				         viewModel.load(pageNum);
					 else
					      viewModel.load((pageNum-1));
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
				//jAlert("删除服务报错!!", "错误");
				alertDangerInfo("删除服务报错!!" ) ;
			}
		});
		
	}
		
	
	return {
		'model' : viewModel,
		'template' : template,
		'init' : init
	};

});