define(
		[ 'jquery', 'knockout',
				'text!pages/mgr/ecadapter/ecplat_goods_list.html' ],
		function($, ko, template) {

			var initSearchParam = '{"plat":"top","method":"getOnsaleItems","format":"json","access":"2","request":{"pageSize": "10","fields":"num_iid,list_time,title,price"}}';

			
			var infoUrl = '/mgr/ecadapter/ecplat_goods_modify/';
			
			addRouter(infoUrl+":id");
			
			var viewModel = {
				data : ko.observable({}),
				content : ko.observableArray()
			}

			viewModel.submitForm = function() {

				var base_param = '{"method":"getOnsaleItems","format":"json","access":"2",'
						+ '"plat":"' + viewModel.data().plat + '",'
				var request_param = '"request":{"pageSize": "10","fields":"num_iid,list_time,title,price"'
				if (viewModel.data().num_iid != null) {
					if (viewModel.data().num_iid.trim() != '') {
						base_param = base_param.replaceStr("getOnsaleItems", "getItem");
						request_param += ',"numIid":"'
								+ viewModel.data().num_iid.trim() + '"';
					}
				}
				if (viewModel.data().sellerCids != null) {
					if (viewModel.data().sellerCids.trim() != '') {
						request_param += ',"sellerCids":"'
								+ viewModel.data().sellerCids.trim() + '"';
					}
				}
				if (viewModel.data().q != null) {
					if (viewModel.data().q.trim() != '') {
						request_param += ',"q":"' + viewModel.data().q.trim()
								+ '"';
					}
				}
				var param = base_param + request_param + '}}';
				new search("params=" + param);
			}

			viewModel.modify = function() {
				
				window.router.setRoute(infoUrl + this.numIid);
			}

			function search(searchParam,curpage) {

				viewModel.content.removeAll();
				var saveUrl = $ctx + '/ecadapter';

				$.ajax({
							type : 'GET',
							contentType : 'application/json',
							url : saveUrl,
							data : searchParam,
							dataType : 'json',
							success : function(data) {
								var msg = "";
								if (data.items_onsale_get_response != null) {
									var total_counts = data.items_onsale_get_response.total_results;
									if (total_counts != 0) {
										var items = data.items_onsale_get_response.items;
										putData(items.item);
										showPage(data.items_onsale_get_response.total_results ,curpage) ;
									} else {
										jAlert("没有找到符合条件的记录。");
									}

								}else if(data.item_seller_get_response != null){
									putData(data.item_seller_get_response);
									showPage(0,1) ;
								}else if(data.code != null){
									msg = data.code + "<br/>" + data.msg;
									jAlert(msg);
								}else if(data.error_response != null){
									msg = data.error_response.sub_msg;
									jAlert(msg);
								}
							}
						});

				return viewModel;
			}
			
			function putData(item){
				$.each(item,
						function(idx, goods) {
							if(goods.num_iid != null){
								viewModel.content.push({
										numIid : goods.num_iid,
										title : goods.title,
										price : goods.price,
										modified : goods.list_time
									});
							}
						});
			}
			
			
			function getSearchParam(pageNo){
				if(pageNo==null || pageNo==undefined ||  pageNo=='undefined' ){
					pageNo=1 ;
				}
				var searchParam={
						"plat":"top",
						"method":"getOnsaleItems",
						"format":"json",
						"access":"2",
						"request":{
							"pageSize": "10",
							"pageNo":pageNo,
							"fields":"num_iid,list_time,title,price"
						}
				} ;
				return	JSON.stringify(searchParam)
//				return searchParam ;
			}
			
			function showPage(total_results,currPage){
				var pages = Math.floor(total_results/10)+1 ;
				$("#pagination").pagination({
					jumppage : false,
					pageSize : false,
					totalPages : pages ,
					currentPage : currPage,
					page : function(page) {
						  search("params=" + getSearchParam(page)  ,page) ;
					}
				})		
			}

			var init = function() {
				search("params=" + initSearchParam);
			}

			return {
				'model' : viewModel,
				'template' : template,
				'init' : init
			};

		});
