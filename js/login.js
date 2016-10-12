$(function(){
	$('.navbar-static-top #top-nav').hide();
	$('.navbar-static-top #top-login').show();
	
	if("" != $("#error_info").html()){
		$("#password").val("");
	}
	
	$(document).keydown(function(e){//键盘回车执行登录
		var evt = window.event ? window.event : e ;
		if(evt.keyCode == 13){
			doLogin();
		}
	});
});

function doLogin(){
	var plainPassword = $("#password").val(); 
	if(plainPassword.indexOf("_encrypted") < 0){
		var key = RSAUtils.getKeyPair(exponent, '', modulus);
		var encryptedPwd = RSAUtils.encryptedString(key, plainPassword);
		$("#password").val(encryptedPwd + "_encrypted"); 
	}
	
    $("#formlogin").submit();
}

/**
 * 利用cookie记住密码
 */
function saveUserInfo() { 
	if ($("#rmbUser").prop("checked") == true) { 
		//在这里添加新的变量
		var userName = $("#username").val(); 
		$.cookie("mep_rmbUser", "true", { expires: 7 }); // 存储一个带7天期限的 cookie 
		$.cookie("mep_userName", userName, { expires: 7 }); 
	}else { 
		$.cookie("mep_rmbUser", "false", { expires: -1 }); 
		$.cookie("mep_userName", '', { expires: -1 }); 
	} 
} 
function fgtUser() {
	//alert("未实现!");
} 

$(document).ready(function() { 
	if ($.cookie("mep_rmbUser") == "true") { 
		$("#rmbUser").attr("checked", true); 
		$("#username").val($.cookie("mep_userName")); 
		$("#username").css("color","#000"); 
	} else{
		//选中用户名input
		$.cookie("mep_rmbUser", "false", { expires: -1 }); 
		$.cookie("mep_userName", '', { expires: -1 }); 
		$("#rmbUser").prop("checked",'');
		$("#username").focus();
	}
}); 