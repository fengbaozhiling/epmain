if(maxtime<=send_time * 60){
	timer = setInterval(countDown ,1000);
}
if(typeof maxtime_mobile !== "undefined"){
	if(maxtime_mobile>0||maxtime_email>0){
		timer_tmp = setInterval(countDown_tmp ,1000);
	}
	
	function countDown_tmp() {
		if(maxtime_mobile>0){
			--maxtime_mobile;
			$("#maxtime_mobile").val(maxtime_mobile);
		}
		if(maxtime_email>0){
			--maxtime_email;
			$("#maxtime_email").val(maxtime_email);
		}
		if(maxtime_mobile<=0&&maxtime_email<=0){
			clearInterval(timer_tmp);
		}
	}
}
function countDown() {
	if (maxtime >= 0) {
		$('#release_get_code').attr('disabled', 'disabled').html('<b>' + maxtime + '秒后重新获取</b>').addClass("submit");
		--maxtime;
	} else {
		clearInterval(timer);
		$('#release_get_code').removeAttr('disabled').html('<b>重获验证码</b>');
	}
}
$('#release_get_code').click(function(){
	if($("#accout_type").length>0) type = $("#accout_type").val();
	var error = null;
	if( type=='mobile'&&! isMobileCN($('#mobile_accout').val()) ) {
		error = "请填写正确的手机号码 <br />";
	}else if(type=='email'&&! isEmail($('#email_accout').val()) ){
		error = "您输入的邮箱格式不正确 <br />";
	}
	if ( error ) {
		showDialog(error);
		return false;
	}
	$(this).attr('disabled',true);
	if($("#txt_auth_code").length>0){
    	var txt_auth_code = $("#txt_auth_code").val();
    }else{
    	var txt_auth_code = "";
    }
	$.post(SITEURL + '/index.php?do=ajax&view=send_code&auth='+auth+'&type='+type, 
			{
			mobile: $('#mobile_accout').val(),
			email:$("#email_accout").val(),
			account:$('#txt_account').val(),
			txt_auth_code:txt_auth_code
			},
		function(json) {
			if ( json.status == 1 ) {
				maxtime = send_time * 60;
				timer = setInterval(countDown, 1000);
				if($("#accout_type").val()=='moblie'){
					if($("#maxtime_mobile").length>0) $("#maxtime_mobile").val(maxtime);
					maxtime_mobile = maxtime;
				}else{
					if($("#maxtime_email").length>0) $("#maxtime_email").val(maxtime);
					maxtime_email = maxtime;
				}
				timer_tmp = setInterval(countDown_tmp, 1000);
				showDialog(json.msg, "right", '操作提示');
				return true;
			}else if( json.status == 2 ){//号码已注册可直接登录
				if(uid){
					$("#release_get_code").attr('disabled',false);
					showDialog(json.msg, "alert", "消息提示");
				}else{
					showDialog(json.msg, "confirm", "消息提示",function(){hideWindow('quick_release');ajax_login();},0,function(){},0,'直接登录','关闭');
				}
				return false;
			}else if( json.status == 3 ){//号码运营商不归属于移动，电信，联通
				showDialog(json.msg, 'right', '操作提示');
				if($('#release_email').length == 0){
					var ema_htm = '<div class="rowElem clearfix"><label>邮箱地址：&nbsp;</label><input size="30" type="text" name="release_email"  id="release_email" limit="required:true;type:email" msg="请填写邮箱地址" msgArea="msg_release_email" autocomplete="off" ajax="/index.php?do=ajax&view=release2&op=check_email&mail=" />&nbsp;<span id="msg_release_email"></span></div>';
					$('#div_validcode').after(ema_htm);
				}
				form_valid();
				return false;
			}else {	
				$("#release_get_code").attr('disabled',false);
				showDialog(json.msg, 'alert', '操作提示');		
				return false;
			}  
	},'json');
});
function change_accout(){
    var accout_type = $("#accout_type").val();
    if (accout_type == 'email') {
    	maxtime = $("#maxtime_email").val();
		if(maxtime>0){
			timer = setInterval(countDown ,1000);
		}else{
			$('#release_get_code').removeAttr('disabled').html('<b>获取验证码</b>');
		}
        $("#email").show();
        $("#mobile").hide();
        $("#label_mobile").hide();
        if($("#div_auth_code").length>0) $("#div_auth_code").hide();
    } else {
    	maxtime = $("#maxtime_mobile").val();
		if(maxtime>0){
			timer = setInterval(countDown ,1000);
		}else{
			$('#release_get_code').removeAttr('disabled').html('<b>获取验证码</b>');
		}
        $("#email").hide();
        $("#mobile").show();
        $("#label_mobile").show();
        if($("#div_auth_code").length>0) $("#div_auth_code").show();
    }
}
$('#mobile_accout').blur(function(){
	var mobVal = $('#mobile_accout').val();
	var validVal = $('#valid_code').val();
	var ajaxurl = SITEURL+'/index.php?do=ajax&view=register&mobile='+mobVal+'&check_valid='+validVal;
	$('#valid_code').attr('ajax',ajaxurl);
	$(document).ajaxComplete(function(){
		if($("#msg_code").html()){
			$('#release_get_code').attr('disabled',true);
			$("#release_get_code").addClass("grey");
		}else{
			$('#release_get_code').attr('disabled',false);
			$("#release_get_code").removeClass("grey");
		}		
	});
});