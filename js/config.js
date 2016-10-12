require.config({
	baseUrl: ".",
	paths: {
		text: "trd/requirejs/text",
		css: "trd/requirejs/css",
		jquery: "trd/jquery/jquery-1.11.2",
		jcookie: "trd/jQuery-cookie/jquery.cookie",
		bootstrap: "trd/bootstrap/js/bootstrap",
		knockout: "trd/knockout/knockout-3.2.0.debug",
		ujs: "js/sys/uui/js/u",
		wizard:"trd/jquery-bootstrap-wizard/jquery.bootstrap.wizard",
		'uploader':"trd/uploader/js/webuploader",
		director:"trd/director/director",
		'jquery.file.upload' : "trd/juqery-file-upload/9.9.2/js/jquery.fileupload",
		'jquery.ui.widget':"trd/jquery-ui/jquery.ui.widget",
		'jquery.iframe.transport':"trd/jquery-iframe-transport/jquery.iframe-transport"
	},
	shim: {
		ujs:{
			deps: ["jquery", "css!js/sys/uui/css/u.css"]
		},
		uploader:{
			deps: ["jquery", "css!trd/uploader/css/webuploader.css"]
		},
		'jquery.file.upload':{
			deps: ["jquery","jquery.ui.widget","jquery.iframe.transport","css!trd/juqery-file-upload/9.9.2/css/jquery.fileupload.css"]
		}
	}
});
