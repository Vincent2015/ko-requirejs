define(
		[ 'jquery', 'knockout',
				'text!pages/mgr/ecadapter/ecplat_goods_modify.html' ],
		function($, ko, template) {
			var viewModel = {
				data : ko.observable({})
			}
			
			var numIid = "";

			viewModel.submitForm = function() {
				var data = viewModel.data();
				var baseParam = '{"plat":"top","method":"updateTaobaoItemPrice","format":"json","access":"2","request":{';
				var dataParam = '"numIid":"' + numIid + '","num":"' + data.num + '","price":"' + data.price + '","increment":"' + data.increment + '","title":"' + data.title +'"}}';
				var searchParam =  baseParam + dataParam;
				alert(searchParam);
//				new search("params=" + searchParam);
			}

			var loadData = function(id) {
				numIid = id;
				var initParam = '{"plat":"top","method":"getItem","format":"json","access":"2","request":{"fields":"num,increment,title,price"';
				var searchParam = initParam + ',"numIid":"'+id+'"}}';
				new search("params=" + searchParam);
			}

			function search(searchParam) {

				var saveUrl = $ctx + '/ecadapter';

				$.ajax({
						type : 'GET',
						contentType : 'application/json',
						url : saveUrl,
						data : searchParam,
						dataType : 'json',
						success : function(data) {
							var msg = "";
							if (data.item_seller_get_response != null) {
								putData(data.item_seller_get_response);
							} else if (data.code != null) {
								msg = data.code + "<br/>" + data.msg;
								jAlert(msg);
							} else if (data.error_response != null) {
								msg = data.error_response.sub_msg;
								jAlert(msg);
							}}
						});

				return viewModel;
			}
			
			function putData(item){
				$.each(item,
						function(idx, goods) {
							if(goods.title != null){
								viewModel.data({
										title : goods.title,
										price : goods.price,
										num : goods.num,
										increment : goods.increment
									});
							}
						});
			}

			var init = function(id) {
				loadData(id);
			}

			return {
				'model' : viewModel,
				'template' : template,
				'init' : init
			};
		});