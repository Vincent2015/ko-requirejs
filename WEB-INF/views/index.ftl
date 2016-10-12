<!DOCTYPE html>
<html>

	<head>
		<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
		<meta charset="utf-8" />
		<title>主页</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		<meta content="" name="description" />
		<meta content="" name="author" />

		<link href="${ctx}/trd/bootstrap/css/bootstrap.css" rel="stylesheet">
		<link href="${ctx}/js/sys/uui/css/u.css" rel="stylesheet">
		<link href="${ctx}/css/index.css" rel="stylesheet">
		
		<script src="${ctx}/trd/jquery/jquery-1.11.2.js" type="text/javascript"></script>
		<script src="${ctx}/trd/jQueryAlert/jquery.ui.draggable.js" type="text/javascript"></script>
		<script src="${ctx}/trd/jQueryAlert/jquery.alerts.js" type="text/javascript"></script>
		<link href="${ctx}/trd/jQueryAlert/jquery.alerts.css" rel="stylesheet" type="text/css" media="screen" />
		<script>
			window.$ctx = '${ctx}';
		</script>
	</head>

	<body>
		<!-- top -->
		<div class="top navbar navbar-default" role="navigation" style="background-color:#464646;">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#example-navbar-collapse">
					<span class="sr-only">切换导航</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">后台管理</a>
				<div type="button" id="show_side" class="navbar-brand glyphicon glyphicon-th-large"></div>
			</div>
			<div class="collapse navbar-collapse" id="example-navbar-collapse">
				<ul class="right-nav nav navbar-nav navbar-right">
					<li>
						<a href="#" class="glyphicon glyphicon-envelope"></a>
					</li>
					<li class="dropdown" style="width:200px;">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							<span class="glyphicon glyphicon-user"></span>
							<span class="">${cusername}</span>
							<span class="glyphicon glyphicon-chevron-down"></span>
						</a>
						<ul class="dropdown-menu">
							<li><a href="#">系统配置</a></li>
							<li><a href="#">个性化</a></li>
							<li><a href="${ctx}/logout">注销</a></li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
		<!-- left -->
		<div class="leftpanel">
			<ul class="left-menu">
			</ul>
		</div>
		<!-- content -->
		<div class="content">内容区</div>

		<script src="${ctx}/trd/requirejs/require.debug.js"></script>
		<script src="${ctx}/js/config.js"></script>
		<script src="${ctx}/js/index.js"></script>
		<!--[if lt IE 9]>
	        <script src="${ctx}/trd/html5shiv.min.js"></script>
	        <script src="${ctx}/trd/respond.min.js"></script>
	    <![endif]-->
	</body>

</html>