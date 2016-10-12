define([ 'jquery', 'knockout', 'text!pages/emall/shopgoods/goodrelease.html','uploader','jquery.file.upload','bootstrap'], function($, ko,template,WebUploader) {
	var goodViewModel = {
		good : ko.observable({})
	}

	goodViewModel.submitForm = function() {
		var flag = $(".form-horizontal").validate().check();
		if (flag) {
			var saveUrl = $ctx + '/emall/goods/create';
			if (this.good().id != 0) {
				saveUrl = $ctx + '/emall/goods/update';
			} 
			$.ajax({
				type : 'POST',
				contentType : 'application/json',
				url : saveUrl,
				data : JSON.stringify(goodViewModel.good()),
				dataType : 'json',
				success : function(savemsg) {
					if (savemsg.flag==1) {
						jAlert(savemsg.msg, "提示");
						document.location.href=$ctx+"/#/emall/goods/goodslist";
					}
				},
				error : function() {
					jAlert("保存详细信息失败!", "错误");
				}
			});
		}

	};

	var loadData = function(id) {
		var infoUrl = $ctx + '/emall/goods/create';
		if (id && id != 0) {
			infoUrl = $ctx + '/emall/goods/update/' + id;
		}
		$.ajax({
			type : 'GET',
			url : infoUrl,
			dataType : 'json',
			success : function(data) {
				data.sendFlag=1;
				data.sendFlag=data.sendFlag.toString();
				goodViewModel.good(data);
			},
			error : function() {
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

	var init = function() {
		var url = 'file/upload/image';
		var downurl = 'file/down/image/'
		loadData(0);
/*		$('#fileupload').fileupload({
			url: url,
			dataType: 'json',
			done: function(e, data) {
				$('#progress').hide();
				var d = goodViewModel.good();
				d.imgLarge = downurl + data.result ;
				goodViewModel.good(d);
			},
			progressall: function(e, data) {
				var progress = parseInt(data.loaded / data.total * 100, 10);
				$('#progress .progress-bar').css('width', progress + '%');
			}
		});	*/	
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
				var d = goodViewModel.good();
				d.imgLarge = downurl + res ;
				goodViewModel.good(d);
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
		'model' : goodViewModel,
		'template' : template,
		'init' : init
	};
});