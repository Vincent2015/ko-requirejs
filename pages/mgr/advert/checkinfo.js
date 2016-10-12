define([ 'jquery', 'knockout', 'text!pages/mgr/advert/checkinfo.html' ,'uploader','jquery.file.upload'],
		function($, ko, template,WebUploader) {
			var viewModel = {
				data : ko.observable({})
			}
			viewModel.submitForm = function() {

				var id = viewModel.data().id;
				var approveUrl = $ctx + '/mgr/advert/approve/' + id;
				
				$.ajax({
					type : 'POST',
					contentType : 'application/json',
					url : approveUrl,
					data : JSON.stringify(viewModel.data()),
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
//							jAlert("审核失败!", "错误");
						}
					},
					error : function(req, textStatus, errorThrown) {
						if (req.responseJSON) {
							var validateObj = req.responseJSON;
							if (validateObj.code) {
								q
								jAlert(validateObj.code, "错误");
							}
						}
					}
				});

			}

			var loadData = function(id) {
				var infoUrl = $ctx + '/mgr/advert/update/' + id;
				$.ajax({
					type : 'GET',
					url : infoUrl,
					dataType : 'json',
					success : function(data) {
						viewModel.data(data);
					},
					error : function() {
						jAlert("获取详细信息失败!", "错误");
					}
				});
			}

			var init = function(id) {
				var url = 'file/upload/image';
				var downurl = 'file/down/image/'
				loadData(id);
/*				$('#fileupload').fileupload({
					url: url,
					dataType: 'json',
					done: function(e, data) {
						$('#progress').hide();
						var d = viewModel.data();
						d.image = downurl + data.result ;
						viewModel.data(d);
					},
					progressall: function(e, data) {
						var progress = parseInt(data.loaded / data.total * 100, 10);
						$('#progress .progress-bar').css(
							'width',
							progress + '%'
						);
					}
				});*/
//				webuploader上传控件
				var up = WebUploader.create({
				    server: 'file/upload/image',
				    swf: 'trd/uploader/swf/Uploader.swf?v=' + Math.random(),
				    pick: '.up',
				    	  // 是否开启自动上传
//				    fileSingleSizeLimit: 1024 * 1024,
				    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
//				    resize: false,
				 // 是否要分片处理大文件上传
//				    chunked: false,
					auto: true,
					compress: false
				});

				up.on( 'uploadSuccess', function( file, res ) {
					//console.log(' 成功把你的资料传上服务器');
					if(res!= '-1'){  // -1  表示文件太大，没有上传
						var d = viewModel.data();
						d.image = downurl + res ;
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
//		      end webuploader控件
			}

			return {
				'model' : viewModel,
				'template' : template,
				'init' : init
			};
		});