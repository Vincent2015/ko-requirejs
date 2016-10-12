define([ 'jquery', 'knockout', 'text!pages/mgr/account/accountinfo.html','bootstrap'],
	function($, ko, template) {
		var viewModel = {
			data : ko.observable({})
		}
		
		viewModel.submitForm = function(){
			var flag = $(".form-horizontal").validate().check();
			if (flag) {
			var saveUrl = $ctx + '/mgr/account/create';
			if(viewModel.data().id != 0){
				saveUrl = $ctx + '/mgr/account/update';
			} 
			//alert(JSON.stringify(viewModel.data()));
			$.ajax({
				type: 'POST',
				contentType: 'application/json', 
				url: saveUrl,
				data: JSON.stringify(viewModel.data()),
				dataType: 'json',
				success: function(savemsg) {
					if (savemsg.flag==1) {
//						showSuccInfo(savemsg) ;
						alertSuccessInfo(savemsg.msg) ;
					}else{
						showErrorInfo(savemsg) ;
					}
				},
				error: function(req, textStatus, errorThrown){
					if(req.responseJSON){
						var validateObj = req.responseJSON;
						if(validateObj.code){
							jAlert(validateObj.code,"错误");
						}
					} 
					//jAlert("保存失败!","错误");
				}
			});
			}
		}
		
		var showSuccInfo = function(savemsg){//显示后台返回的成功信息    
			$.showMessage({
				type: "success",
				msg: savemsg.msg,
				pos: {
					bottom: "30px",
					right: "30px"
				}
			});
		}
		var showErrorInfo = function(savemsg){//显示后台返回   失败信息
			$.showMessage({
				type: "warning",
				msg: savemsg.msg,
				pos: {
					bottom: "30px",
					right: "30px"
				}
			});
		}
	
		var loadData = function(id) {
			var infoUrl = $ctx + '/mgr/account/create';
			if(id && id!=0){
				infoUrl = $ctx + '/mgr/account/update/' + id;
			}
			$.ajax({
				type: 'GET',
				url: infoUrl,
				dataType: 'json',
				success: function(data) {
					viewModel.data(data);
				},
				error: function(req, textStatus, errorThrown) {
					$.showMessage({
						type: "warning",
						msg: "获取详细信息失败!",
						pos: {
							bottom: "30px",
							right: "30px"
						}
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
	}
);