define([ 'jquery', 'knockout', 'text!pages/emall/shop/checkinfo.html' ],
		function($, ko, template) {
			var viewModel = {
				data : ko.observable({})
			}
			viewModel.opinion = ko.observable("同意注册");
			viewModel.submitForm = function() {

				var id = viewModel.data().id;
				var approveUrl = $ctx + '/emall/shop/approve/' + id;
				var data = {
					opinion : viewModel.opinion()
				}
				$.ajax({
					type : 'POST',
					contentType : 'application/json',
					url : approveUrl,
					data : JSON.stringify(data),
					dataType : 'json',
					success : function(data) {
						if (data) {
							$.showMessage({
								type: "success",
								msg: "审核成功",
								pos: {
									bottom: "30px",
									right: "30px"
								}
							});
						} else {
							$.showMessage({
								type: "error",
								msg: "审核失败",
								pos: {
									bottom: "30px",
									right: "30px"
								}
							});
						}
					},
					error : function(req, textStatus, errorThrown) {
						if (req.responseJSON) {
							var validateObj = req.responseJSON;
							if (validateObj.code) {
								jAlert(validateObj.code, "错误");
							}
						}
					}
				});

			}

			var loadData = function(id) {
				var infoUrl = $ctx + '/emall/shop/update/' + id;
				$.ajax({
					type : 'GET',
					url : infoUrl,
					dataType : 'json',
					success : function(data) {
						// alert(JSON.stringify(data));
						viewModel.data(data);
					},
					error : function() {
						jAlert("获取详细信息失败!", "错误");
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