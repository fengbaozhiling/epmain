$(function(){
	$("#qq").click(function(){
		$("#ct_qq").toggle();
	})
	$("#email").click(function(){
		$("#ct_email").toggle();
	})
	$("#mobile").click(function(){
		$("#ct_mobile").toggle();
	})
	
	$("#tar_content").blur(function(){
		contentCheck('tar_content',"服务描述",10,1000);
	})
	
	$(".lit_form input:[type='text']").each(function(){
		$(this).val()==''&&$(this).val($(this).attr("ext"));
	})
});

uploadBlur = function() {
	if (ifOut("upfile", "5") && $("#upload").val()) {
		upload("upload", "att", "front", "", "", "task")
	} else {
		return false
	}
};
/**
 * 获取商品行业
 * @param indus_pid
 */
function showIndus(indus_pid){
	if(indus_pid){
		$.post("/index.php?do=ajax&view=indus",{indus_pid: indus_pid}, function(html){
			var str_data = html;
			if (trim(str_data) == '') {
				$("#indus_id").html('<option value="-1"> 请选择子行业 </option>');
			}
			else {
				$("#indus_id").html(str_data);
			}
			if(getcookie('ft'+self.location.hostname.toString().replace(/\./g,"")) == "1"){
				document.getElementById("StranLink").innerHTML = "繁体版";
				StranBody();
			}
		},'text');
	}
}

function checkAgreement(){
	if($("#agreement").attr("checked")==false){
		showDialog("请先同意服务发布协议","alert","操作提示");return false;
	}else return true;
}


function stepCheck(){
	//新版验证start，会影响旧功能，旧页面将不可用
	var i = checkForm(document.getElementById('frm_step2'));
	var pass = false;
	if(i){
		if(contentCheck('tar_content',"任务需求",1,1500,0,'',editor)&&checkAgreement()){
			pass = true;
		}else{
			if(!checkAgreement()){
				showDialog('您必须同意协议','alert','协议确认');
				return false;
			}
			else{
				showDialog('需求字数限定1-1500','alert','需求不完整');
				return false;
			}
		}
		return checkLogin(pass);
	}else{
		return false;
	}
}

/**
 * 检查登录
 */
function checkLogin(pass){
	
	if(pass==false){
		return false;
	}
	$.getJSON('/index.php?do=release&ac=check_login',function(json){
		if(json.status){
			$("#frm_step2").submit();
		}else{
			showWindow('login', '/index.php?do=ajax&view=login&visitmode=release', 'get', 0);
//			showDialog('请登录后再发布','confirm','操作提示',function(){
//				window.open('index.php?do=login','_blank');$('#fwin_dialog,#fwin_dialog_cover').remove();
//			});
			return false;
		}
	})
}

/**
 * 上传完成后的页面响应
 * @param json json数据
 */
function uploadResponse(json){
	if($("#"+json.fid).length<1){//判断是否已有同样的li、
		var file_ids = $("#file_ids").val();
		if(file_ids){
			$("#file_ids").val(file_ids+','+json.fid);
		}else{	
			$("#file_ids").val(json.fid);
		}
		$("#pic").val(json.msg.url);
	}
}
//页面金额显示-通用
function show_total_cash(){
	var task_way = $("#task_way").val();
	var model_id = $("#model_id").val();
	var cash_task;
	var item_cash = Number($("#item_total_cash").val());
	var total_cash;
	if(task_way==0){
		cash_task = 0;
	}else if(task_way==1){
		if (model_id==1||model_id==2||model_id==3){
			cash_task = Number($("#txt_task_cash1").val());
		}else{
			cash_task = 0;
		}
	}else if(task_way==2){
		cash_task = 0;
	}else{
		cash_task = 0;
	}
	total_cash = cash_task+item_cash;
	$("#cash_task").html(cash_task);
	$("#total").html(total_cash);
}
//切换联系方式
function change_contact(){
	var cont_type = $("#cont_type").val();
	if (cont_type=='mobile'){
		$("#tar_contact").attr("msg","请填写正确的电话号码");
		$("#tar_contact").attr("limit","required:true;type:TelCN");
		$("#tar_contact").attr("original-title","填写您的常用电话号码");
		$("#tar_contact").attr("value",user_info_mobile);
	}else if (cont_type=='qq'){
		$("#tar_contact").attr("msg","请填写正确QQ号码");
		$("#tar_contact").attr("limit","required:true;type:digit;len:5-13");
		$("#tar_contact").attr("original-title","填写您的常用QQ");
		$("#tar_contact").attr("value",user_info_qq);
	}else if (cont_type=='email'){
		$("#tar_contact").attr("msg","请填写正确的E-MAIL");
		$("#tar_contact").attr("limit","required:true;type:email");
		$("#tar_contact").attr("original-title","填写您的常用电子邮箱");
		$("#tar_contact").attr("value",user_info_email);
	}else{
		return false;
	}
}