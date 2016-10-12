define([ 'jquery', 'knockout', 'text!pages/emall/admgr/admgrinfo.html','uploader','jquery.file.upload','bootstrap' ], function($, ko, template,WebUploader) {
	var viewModel = {
		data : ko.observable({}),
		submitForm : function() {
			var flag = $(".form-horizontal").validate().check();
			if (flag) {
				var saveUrl = $ctx + '/emall/admgr/create';
				if (this.data().id && this.data().id != 0)
					saveUrl = $ctx + '/emall/admgr/update';
				$.ajax({
					type : 'POST',
					contentType : 'application/json',
					url : saveUrl,
					data : JSON.stringify(viewModel.data()),
					dataType : 'json',
					success : function(savemsg) {
						if (savemsg.flag==1) {
							showSuccInfo(savemsg) ;
						}else{
							showErrorInfo(savemsg) ;
						}
					},
					error : function() {
						alertDangerInfo("保存失败!") ;
					}
				});
			}
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
		var infoUrl = $ctx + '/emall/admgr/create';
		if (id && id != 0) {
			infoUrl = $ctx + '/emall/admgr/update/' + id;
		}
		$.ajax({
			type : 'GET',
			url : infoUrl,
			dataType : 'json',
			success : function(data) {
				viewModel.data(data);
			},
			error : function() {
				alertDangerInfo("获取详细信息失败!") ;
			}
		});
	}

	var init = function(id) {
		var url = 'file/upload/image';
		var downurl = 'file/down/image/'
		loadData(id);
/*		$('#fileupload').fileupload({
			url : url,
			dataType : 'json',
			done : function(e, data) {
				$('#progress').hide();
				var d = viewModel.data();
				d.href = downurl + data.result;
				viewModel.data(d);
			},
			progressall : function(e, data) {
				var progress = parseInt(data.loaded / data.total * 100, 10);
				$('#progress .progress-bar').css('width', progress + '%');
			}
		});*/
		
//		webuploader上传控件
		var up = WebUploader.create({
		    server: 'file/upload/image',
		    swf: 'trd/uploader/swf/Uploader.swf?v=' + Math.random(),
		    pick: '.up',
		    	  // 是否开启自动上传
//		    fileSingleSizeLimit: 1024 * 1024,
		    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
//		    resize: false,
		 // 是否要分片处理大文件上传
//		    chunked: false,
			auto: true,
			compress: false
		});

		up.on( 'uploadSuccess', function( file, res ) {
			//console.log(' 成功把你的资料传上服务器');
			if(res!= '-1'){  // -1  表示文件太大，没有上传
				var d = viewModel.data();
				d.href = downurl+res;
				viewModel.data(d);
			}
		});

		up.on( 'uploadError', function( file ) {
		    alert('上传失败');
		});
		
		up.on( 'fileQueued', function( file ) {
			//console.log(file) ;
			if( file.size > 1024*1024) {
				alert("file too big,less 1M");
				return ;
			}

		});
//      end webuploader控件

	}
	return {
		'model' : viewModel,
		'template' : template,
		'init' : init
	};
});