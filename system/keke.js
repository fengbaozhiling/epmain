$(function(){
	//右侧工具栏展开关闭操作
	$(".toolmin a.tool_ico").bind("mouseover",function(){
		$(".toolcont").hide();
		$(".toolmin a.tool_ico").removeClass("on");
		$(this).addClass("on");
		$(this).parent().find(".toolcont").show();
	})
	/*$(".toolcont").bind("mouseover",function(){
		$(".toolmin a.tool_ico").removeClass("on");
		$(this).parents(".toolmin").find("a.tool_ico").addClass("on");
	})*/
	$('.toolposit div').eq(1).hover(
     function(){
		 $(this).find('.toolcontbox').show();
		 },
	 function(){
		 $(this).find('.toolcontbox').hide();
		 }
    );
	 $(window).scroll(function(){
	    if($(window).scrollTop()>100){
			$('#goTopBtn').show();
		}else{
		    $('#goTopBtn').hide();	
		}
	});
	
	$("#rightToolbar").bind("mouseleave",function(){
		$(".toolcont").hide();
		$(".toolmin a.tool_ico").removeClass("on");
	})
	$(".toolmin .tx").bind("focus", function(){
		 if(this.value==this.defaultValue){
				this.value='';
				this.className='tx c333';
			}; 
	 })
	if(getcookie('dsfdsfda')==1){
		$("#note").html("<div style='background:red;text-align:center;'><a href='/index.php?dsfdsfda=-1' style='color:#fff'>您现在处于测试环境中，点击后进入正式环境</a></div>");
	}
	$(".scrollTop").click(function(){
		$("html,body").animate({scrollTop: $("#pageTop").offset().top});
	})
	$('img').error(function() {
		$(this).attr('src', SITEURL + '/resource/img/system/nopic200.jpg');
	}).each(function() { // 修正IE下无法显示问题
		$(this).attr('src', $(this).attr('src')); 
	});
	if(typeof(INDEX)!="undefined"){
		var ajax_user_url = "/index.php?do=ajax&view=user_status&rand="+Math.random()+"&index="+INDEX;
		if(INDEX == 'task' && typeof (task_id) != 'undefined'){
			ajax_user_url += "&task_id="+task_id;
		}
		switch(INDEX){
			case 'shop':
				if(typeof(art_id)=="undefined") art_id=null;
				$.post(ajax_user_url,{sid:sid,ac_url:ac_url,http_host:http_host,my_request_uri:request_uri,art_id:art_id},function(json){
					if(json.status){
						commom_ajax_replace(json.data.formhash,json.data.top_u_pic,json.data.messagecount,json.data.nav_pull26,json.data.index_r_bar);
						if(json.data.show_auth_code_login){
							$("#div_auth_code").show();
							$("#li_auth_code").show();
						}
						if(art_id){
							if($("#liuyanbox").length>0) $("#liuyanbox").html(json.data.art_comment);
						}else{
							if($("#liuyanbox").length>0) $("#liuyanbox").html(json.data.comment);
						}
						if(json.data.shop_myshop&&$("#ajax_shop_myshop").length>0) $("#ajax_shop_myshop").append(json.data.shop_myshop);
						//联系方式
						if($("#contact_phone").length>0){
							if(check_user_login()){
								if($("#contact_phone").length>0) $("#contact_phone").html(json.data.contact_phone);
								if($("#contact_mobile").length>0) $("#contact_mobile").html(json.data.contact_mobile);
								if($("#contact_email").length>0) $("#contact_email").html(json.data.contact_email);
								if($("#contact_qq").length>0) $("#contact_qq").html(json.data.contact_qq);
								if($("#contact_truename").length>0) $("#contact_truename").html(json.data.contact_truename);
							}
						}
						/*	if($("#pnub").length>0) $("#pnub").html(json.data.pnub);
						if($("#left_phone").length>0) $("#left_phone").html(json.data.left_phone);
						if($("#left_mobile").length>0) $("#left_mobile").html(json.data.left_mobile);
						if($("#left_email").length>0) $("#left_email").html(json.data.left_email);
						if($("#left_qq").length>0) $("#left_qq").html(json.data.left_qq);*/
						
					}
				},"json");
				break;
			case 'task_list':
				var task_ids='';
				$(".mywork").each(function(){
					task_ids+=","+$(this).attr("id");
				});
				$.post(ajax_user_url,{task_ids:task_ids},function(json){
					if(json.status){
						commom_ajax_replace(json.data.formhash,json.data.top_u_pic,json.data.messagecount,json.data.nav_pull26,json.data.index_r_bar);
						$(".mywork").each(function(){
							var task_id = $(this).attr("id");
							if(json.data[task_id]){
								$("#"+task_id).html(json.data[task_id]['txt']);
								$("#"+task_id).attr("class",json.data[task_id]['classname']);
							}
						});
					}
				},'json');
				break;
			default:
				$.post(ajax_user_url,function(json){
					if(json.status){
						commom_ajax_replace(json.data.formhash,json.data.top_u_pic,json.data.messagecount,json.data.nav_pull26,json.data.index_r_bar);
						switch(INDEX){
							case 'prom':
								if(json.data.prom_index&&$("#ajax_user_prom_index").length>0)  $("#ajax_user_prom_index").html(json.data.prom_index);
								break;
							case 'vip':
								if(json.data.vip_index&&$("#ajax_user_vip_index").length>0) $("#ajax_user_vip_index").html(json.data.vip_index);
								break;
							case 'gonglue':
								if($("#liuyanbox").length>0) $("#liuyanbox").html(json.data.comment);
								break;
							case 'task':
								if($(".pinluncontes .answer-form").length>0){
									$(".pinluncontes .answer-form").each(function(){
										$(this).html(json.data.gj_comment);
									})
								}
								if($("#liuyanbox").length>0) $("#liuyanbox").html(json.data.comment);
								break;
							case 'index':
								$(".navouterbox").before(json.data.index_pop);
								$("#VIPtips").animate( { bottom: "5px"}, { queue: true, duration: 1000 } );
								$("#closetips").click(function(){$("#VIPtips").hide();})
								break;
							case 'user':
								if($("#witkey_msg").length>0) $("#witkey_msg").html(json.data.witkey_msg);
								break;
						}
					}
				},"json");
				break;
		}
	}
	
	if(typeof(INDEX)!="undefined"){
		if(INDEX != 'yun'){
			//根据IP判断页面简繁显示
			In.add('StranJF',{path:SITEURL+'/resource/js/system/Std_StranJF.Js',type:'js',charset:'utf-8'});
			var ft_homename = "ft"+self.location.hostname.toString().replace(/\./g,"");
			var ft_homename_flag = ft_homename+'_flag';
			var ft_arr = SITEURL.split('.');
			ft_arr.shift();
			var ft_domain = ft_arr.join('.');
			if(getcookie("ft"+ft_arr.join('')+'_flag')){
				var flag_co = getcookie("ft"+ft_arr.join('')+'_flag');
				var co = getcookie("ft"+ft_arr.join(''));
				setcookie("ftwww"+ft_arr.join('')+'_flag',flag_co,604,'/','www.'+ft_domain);
				setcookie("ftwww"+ft_arr.join(''),co,604,'/','www.'+ft_domain);
				setcookie("ft"+ft_arr.join('')+'_flag',0,-1,'/',ft_domain);
				setcookie("ft"+ft_arr.join(''),0,-1,'/',ft_domain);
			}
			if(http_host){
				var cur_ft = getcookie("ftwww"+ft_arr.join(''));
				var cur_flag = getcookie("ftwww"+ft_arr.join('')+"_flag");
				if(cur_flag){
					setcookie(ft_homename_flag,cur_flag,604);
					if(cur_ft){
						setcookie(ft_homename,cur_ft,604);
					}
				}
			}
			if(!getcookie(ft_homename_flag)){
				$.getScript("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js&ip="+ip+"&callback=?",function(){
			        if(remote_ip_info.province == '台湾'){
			        	setcookie(ft_homename,1,604);
			        }else{
			        	setcookie(ft_homename,0,604);
			        }
			    	setcookie(ft_homename_flag,1,604);
			    	In('StranJF');
			    });
			}else{
				In('StranJF');
			}
		}
	}
});

/**
 * ajax全局事件
 */
$(document).ajaxComplete(onCompleteFunc);
function onCompleteFunc(){
	if(getcookie('ft'+self.location.hostname.toString().replace(/\./g,"")) == "1" && SITEURL.indexOf('admin') < 0){
		document.getElementById("StranLink").innerHTML = "繁体版";
		StranBody();
	}
}
/**
 * 用户登录信息替换
 * */
function commom_ajax_replace(formhash,top_u_pic,messagecount,nav_pull26,index_r_bar){
	if($("#formhash").length>0) $("#formhash").val(formhash);
	if($("#top_u_pic").length>0) $("#top_u_pic").html(top_u_pic);
	if($("#messagecount_1").length>0) $("#messagecount_1").html(messagecount);
	if($("#messagecount_2").length>0) $("#messagecount_2").html(messagecount);
	if(nav_pull26){
		$("#nav_pull2").remove();
		$("#add_nav_aj").before(nav_pull26);
	}
	if(typeof(index_r_bar)!="undefined"&&$("#index_r_bar").length>0) $("#index_r_bar").html(index_r_bar);
}
/**
 * * 清除输入框的字符,只限制数据输入
 * 
 * @param {Object}
 *            inputobj
 */
function clearstr(inputobj){
    inputobj.value = inputobj.value.replace(/[^.0123456789]/g, '');
    
}
/**
 * 只允许输入数字 
 */
function clearstr2(inputobj){
    inputobj.value = inputobj.value.replace(/[^0123456789]/g, '');
}

/**
 * 
 * @限制上传文件大小
 * @filepath 文件路径
 * @limit_size 文件大小,单位M; 
 */
function file_limit_size(filePath,limit_size){
	var size;
	var limit_size = limit_size*1024*1024;
    if (window.ActiveXObject)// 判断条件也可以改为navigator.userAgent.indexOf("MSIE")!=-1
    {
        // IE浏览器
        var image = new Image();
        image.dynsrc = filePath;
        size = image.fileSize; 
    }
    else if (navigator.userAgent.indexOf("Firefox") != -1) { 
            // 火狐浏览器
            size = document.getElementById("myFile").files[0].size;  
        } 
	else if(navigator.userAgent.indexOf("Chrome") != -1){ // 谷歌
		 size = document.getElementById("myFile").files[0].fileSize;  
	}
	if(size>limit_size){
		return false; 
	}else{
		return true; 
	} 
}



// 打印需求
function  setprint (area){
	$("#"+area).printArea();
}

// 设置文字大小
var sizei = 0;
var setfontsize = function(){	
	i = sizei+1;
	sizei = sizei+1;
	var size = new Array("12","14","16","18");
    if(i<size.length){
		if(i>0){
		   $("#details").removeClass("font"+size[i-=1]);	
		}
		$("#details").addClass("font"+size[i+=1]);
	}else{
		sizei = 0;
		$("#details").removeClass("font"+size[3]);
		$("#details").addClass("font"+size[0]);
	}	
}
/**
 * 清除特殊符号
 * 
 * @param {Object}
 *            inputobj
 */
function clearspecial(inputobj){
	inputobj.value = inputobj.value.replace(/[^a-z\d\u4e00-\u9fa5]/ig, '');
}
var share=function(obj,title){
	var id = obj.id;
	CHARSET.toLowerCase()=='utf-8'?obj.href = encodeURI(obj.href):'';
	if(id&&obj.tagName=='A'){
		if($(obj).find('div').length){
			var div = $(obj).find("div:first");
				div.attr("href",obj.href);
				div.attr("id","div_"+id);
		}else{
			var div = "<div id='div_"+id+"' href='"+obj.href+"' class='icon16 share'>分享</div>";
			$(obj).html(div);
		}
	}
	obj = $(obj).find("div:first").get(0);
	ajaxmenu(obj,250,'1','2','43');
	return false;
}
/** 检查用户是否登录 */
function check_user_login(url) {
	if (typeof(uid)=="undefined"||isNaN(uid) || uid == 0) {
		if(typeof(ROOTURL)!='undefined'){
			showDialog('請問是否要立即登入？', 'confirm', '會員登入', function(){ajax_login('yun',SITEURL);}, 0);
		}else{
			showDialog('此项操作需要登录，是否现在登录？', 'confirm', '登录消息提示', 'ajax_login()', 0);
		}
		return false;
	} else {
		return true;
	}
}

/** ajax_login跳转 */
function ajax_login(typestr,urlstr){
	var str_type = typestr ? '&type='+typestr : '';
	var str_url = urlstr ? '&url='+urlstr : '';
	showWindow('loginbox', '/index.php?do=ajax&view=login'+str_type+str_url);
	return false;
}


/** showWindow跳转 */
function win_confirm(url) {
	if (url) {
		location.href = url;
	}
}
/** 用户登录 */

function login() {
	location.href="/index.php?do=login";
}

function redirect_url(url){
	 
   var furl = window.location.href;
   var tourl =url?url:"/index.php?do=login";
   url = tourl.replace(/\?/,"\\?"); 
   var pos = furl.search(url);  
   if(pos == -1){ 
   	   setcookie('loginrefer',furl,120);
   }
  
 window.location.href = tourl;
}
/**
 * 
 */
function logout(){
	$.getJSON('/index.php?do=logout',function(json){
		if (json.data.synhtml){
		      var cookie = "cookie_logout_syn="+json.data.uid;
		      document.cookie = cookie;	        
		}
		var str=document.domain;
		var words= new Array(); //定义一数组
		words = str.split(".");
		var domain="."+words[1]+"."+words[2];
		 var multi_domain_cookie = "cookie_logout_multi_domain="+json.data.uid+"; domain="+domain;;
	     document.cookie = multi_domain_cookie;	 
		 window.location.href = json.data.syn;	
	})
}
/**
 * 上传进度条
 * 
 * @param parsentObj
 *            进度条所在父级元素
 * @param obj
 *            进度条选择器
 * @param time
 *            动画时间
 */
function loadingControl(parsentObj,obj,time){
	$(parsentObj).find(obj).animate({width:'100%'},time,function(){$(this).html('complete!')});
}

/**
 * 收藏
 * 
 * @param string
 *            type 收藏类型 task/work/case/shop/service
 * 
 */
function favor(pk,type,model_code,obj_uid,obj_id,obj_name,origin_id) {
	if (check_user_login()) {
		//alert(pk+','+type+','+model_code+','+obj_uid+','+obj_id+','+obj_name+','+origin_id);
		var url='/index.php?do=ajax&view=ajax&ac=favor';
		$.post(url,{pk:pk,keep_type:type,obj_id:obj_id,obj_id:obj_id,model_code:model_code,obj_uid:obj_uid,obj_name:obj_name,origin_id:origin_id},function(json){
			if(json.status==1){
				//alert(1);
				showDialog(json.data,'notice',json.msg);return false;
			}else{
				//alert(2);
				showDialog(json.data,'alert',json.msg);return false;
			}
		},'json')
	}
}

/**
 * 任务周报订阅
 */
function task_subscribe(obj_email,formhash,op){
	if(check_user_login()){
		if(op == 'cancel'){ // 取消订阅
			 $.post('/index.php?do=subscribe&op=cancel',{sbt_edit:true},
				 function(json){				 	
					 showDialog(json.msg,'notice',"消息提示","window.top.location.reload()");
				  },'json');
			return false;
		}else{
			var email = $("#"+obj_email);
			if(email.val() != '输入您想搜索的帮助主题关键词'){
				var patrn;
				patrn = /^[a-zA-Z0-9]([a-zA-Z0-9_-]|[.])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
				if (!patrn.exec(email.val())) {
					showDialog("您填写的邮件格式不正确！",'notice');
					email.focus();
					return false;
				}else{
					window.location.href='/index.php?do=subscribe&view=step2&frm_submit=1&formhash='+formhash+'&email=' + email.val();
					window.event.returnValue = false;
				}
			}
		}
	}
}

/**
 * 邀请人才(发送邀请当前任务)
 */
function inviteHand(task_id){	
	if (check_user_login()) {
		showWindow('task_invite','/index.php?do=ajax&view=invite&task_id='+task_id);
		return false;
	}
}
/**
 * 人才邀请（可以选择自己的任务）
 */
function talent_invite(i_uid){
    if (check_user_login()) {
        showWindow('task_invite' + i_uid, '/index.php?do=ajax&view=invite&opp=task_list&i_uid=' + i_uid, 'get', 0);
        return false;
    }
}

/**
 * 友情链接申请
 */
function link_box(location_id) {
	if(check_user_login()){ 
		showWindow('linkbox', '/index.php?do=ajax&view=link&ac=add&location_id='+location_id);
	}
}

/**
 * 稿件描述检测
 * 
 * @Param contentObj
 *            待检测文本域ID
 * @param minLength
 *            最小字数
 * @param maxLength
 *            最大字数
 * @param winTitle
 *            窗口标题
 * @param msgType
 *            msgType 消息提示类型 0 shoDialog提示。1表示tips提示
 * @param showTarget
 *            showTarget 消息插入容器ID 。当msgType=1时有效
 * @param Object
 *            editor 编辑器对象
 */

function contentCheck(contentObj,winTitle,minLength,maxLength,msgType,showTarget,editor){
		var shtml = '';
		var len	  = 0;
		if(typeof editor=='object'){
			shtml =	editor.stripHtml();
		}else{
			shtml =	$("#"+contentObj).val();
		}
		shtml = trim(shtml);
		len	  = shtml.length;
		if(len>maxLength){
			if(msgType==1){
				tipsAppend(showTarget,winTitle+"内容不得多于"+maxLength+"个字",'warning','orange');
			}else{
				var des_msg = $("#"+contentObj).attr("msgArea");
				$("#"+des_msg).addClass("valid_error").html("<span>"+winTitle+"内容不得多于"+maxLength+"个字</span>");
			}
			return false;
		}else if(len<minLength){
			if(msgType==1){
				tipsAppend(showTarget,winTitle+"内容不得少于"+minLength+"个字",'warning','orange');
			}else{
				var des_msg = $("#"+contentObj).attr("msgArea");	
				$("#"+des_msg).addClass("valid_error").html("<span>"+winTitle+"内容不得少于"+minLength+"个字</span>");
			}
			return false;
		}else{
			var des_msg = $("#"+contentObj).attr("msgArea");
			$("#"+des_msg).removeClass("valid_error").html(" ");
			if(minLength==0) return true;
			return shtml;
		}
}
/**
 * 上传文件数量检查
 * 
 * @param obj
 *            元素插入对象
 * @param max
 *            允许最大数量
 * @returns {Boolean}
 * @param {Object}
 *            msgType 消息提示类型 0或1 0shoDialog提示。1表示tips提示
 * @param {Object}
 *            showTarget 消息插入容器ID 。当ac_type=1时有效
 */
function ifOut(obj,max,msgType,showTarget){
	var num = parseInt($("#"+obj+" li").length)+0;
	if(num>=max){
		if(msgType==1){
			tipsAppend(showTarget,"文件上传数量超过限制,最大"+max+"个",'warning','orange');
		}else{
			showDialog("文件上传数量超过限制,最大"+max+"个","alert","操作提示");
		}return false;
	}else{
		return true;
	}
}
/**
 * 互评页面调用
 */
function mark(require_url,Do,obj,obj_id){
	var jump='';
	Do&&obj&&obj_id?jump+='do-'+Do+'*'+obj+'-'+obj_id:'';
	showWindow('mark',require_url+'&jump_url='+jump,'get',0);return false;
}

/**
 * 消息提示方法
 * 
 * @param target
 *            当前操作对象id
 * @param msg
 *            提示消息
 * @param type
 *            提示类型 successful error waring
 * @param color
 *            提示框颜色
 */
function tipsAppend(target, msg, type, color){
    $("#" + target).before("<div id='tips'></div>");
    var tips = $("<div class='messages " + color + "'><span class='icon16'>" + type + "</span>" + msg+"</div>" );
    $("#tips").empty().append(tips);
    msgshow(tips);
	var hide = setTimeout(function() {
		msghide($("#tips"));
		clearTimeout(hide);
	}, 2000);
}

// 显示消息
function msgshow(ele) {
	var t = setTimeout(function() {
		ele.slideDown(200);
		clearTimeout(t);
	}, 100);
}
// 关闭消息
function msghide(ele) {
	ele.animate({
		opacity : .01
	}, 200, function() {
		ele.slideUp(200, function() {
			ele.remove();
		});
	});
};
/**
 * flash 文件上传
 * 
 * @param (Object)
 *            paramReg 上传基本参数注册
 * @param (Object)
 *            contrReg 站内业务参数注册
 */
function uploadify(paramReg,contrReg){
	var paramReg  = paramReg?paramReg:{};
	var contrReg  = contrReg?contrReg:{};
	var uploadify = {};
	var auto 	  = paramReg.auto==true?true:false;// 是否自动提交
	var debug     = paramReg.debug==true?true:false;// 是否开启debug调试
	var hide      = paramReg.hide==true?true:false;// 上传完成后是否隐藏文件域
	var swf  	  = paramReg.swf?paramReg.swf:'/resource/js/uploadify/uploadify.swf';// flash路径
	var uploader  = paramReg.uploader?paramReg.uploader:'/index.php?do=ajax&view=upload';// //上传基本路径
	var deleter   = paramReg.deleter?paramReg.deleter:'/index.php?do=ajax&view=file&ajax=delete';// 文件删除路径
	var file=fname= paramReg.file?paramReg.file:'upload';// file
															// 表单名name=id=upload
	var resText   = paramReg.text?paramReg.text:'file_ids';// 上传完成后结果保存表单名.name=id=file_ids;
	var size      = paramReg.size;// 文件大小限制
	var maxsize   = paramReg.maxsize?paramReg.maxsize:0;
	var exts      = paramReg.exts;// 文件类型限制
	var method    = paramReg.m?paramReg.m:'post';// 上传方式
	var limit     = paramReg.limit?paramReg.limit:1;// 上传个数限制
	
	var task_id   =	parseInt(contrReg.task_id)+0;
	var work_id   = parseInt(contrReg.work_id)+0;
	var obj_id    = parseInt(contrReg.obj_id)+0;
	var pre       = contrReg.mode=='back'?'../../':'';
	var fileType  = contrReg.fileType?contrReg.fileType:'att';
	var objType   = contrReg.objType?contrReg.objType:'task';
		swf		  = pre+swf;
		deleter   = pre+deleter;
		uploader  = pre+uploader+'&file_name='+file+'&file_type='+fileType+'&obj_type='+objType+'&task_id='+task_id+'&maxsize='+maxsize+'&work_id='+work_id+'&obj_id='+obj_id+'&PHPSESSID='+xyq;
		if(getcookie("dsfdsfda")){
			uploader=uploader+"&ajaxfdsfda=1";
		}
		
		//if(task_id == 183497){alert(uploader);}
		uploadify.auto			  =	auto;
		uploadify.debug			  =	debug;
		uploadify.hide			  =	hide;
		uploadify.swf			  =	swf;
		uploadify.uploader		  = uploader;
		uploadify.deleter 		  = deleter;
		uploadify.fileObjName	  =	file;
		uploadify.resText    	  =	resText;
		uploadify.fileSizeLimit	  =	size;
		uploadify.fileTypeExts	  =	exts;
		uploadify.uploadLimit     = limit;
		uploadify.method		  = method;
		uploadify.onUploadSuccess =	function(file,json,response){
			json = eval('('+json+')');
			if(json.err){
				//if(msgType==1){
				//	tipsAppend(showTarget,json.err,'error','red');
				//}else{
					showDialog(decodeURI(json.err), 'alert', '错误提示','',0);
				//}
				return false;
			}else{
				json.filename  = fname;
				typeof(uploadResponse)=='function'&&uploadResponse(json);
			}
		};
	$("#"+file).uploadify(uploadify);
}
/**
 * 文件上传 uploadResponse这个方法需要具体使用的时候自行定义。因为不同的地方响应插入页面的内容不同
 * 
 * @param task_id
 *            任务id/后台时表示文件类型
 * @param obj_id
 *            对象id
 * @param obj_type
 *            对象类型
 * @param fileType
 *            上传类型 att,big,service
 * @param mode
 *            上传模式 front,back
 * @param {Object}
 *            fileName 文件名
 * @param {Object}
 *            width 限制宽
 * @param {Object}
 *            height 限制高
 * @param {Object}
 *            msgType 消息提示类型 0或1 0shoDialog提示。1表示tips提示
 * @param {Object}
 *            showTarget 消息插入容器ID 。当ac_type=1时有效
 */
function upload(fileName,fileType,mode,task_id,obj_id,obj_type,width,height,msgType,showTarget){
	var fileObj=document.getElementById(fileName);
		if(isExtName(fileObj,1,msgType,showTarget)){
			mode=='back'?pre = "../../":pre='/';
			var url=pre+"index.php?do=ajax&view=upload&task_id="+task_id+"&file_type="+fileType+"&obj_type="+obj_type+"&obj_id="+obj_id+"&file_name="+fileName;
			$.ajaxFileUpload({
				url:url,
				fileElementId:fileName,
				dataType:'json',
				success:function(json){
					if(json.err){
						if(msgType==1){
							tipsAppend(showTarget,json.err,'error','red');
						}else{
							showDialog(decodeURI(json.err), 'alert', '错误提示','',0);
						}
						return false;
					}else{
						json.filename  = fileName;
						uploadResponse(json);
					}
				 },
				error:function(json,status,e){
					if(msgType==1){
						tipsAppend(showTarget,e,'error','red');
					}else{
						showDialog(e, 'alert', '错误提示','',0);
					}
					return false;
				}
			});
		}
}

/**
 * 发送 站内信
 * 
 * @param int
 *            to_uid 接受方用户编号
 *            to_username 接受方用户名
 */
function sendMessage(to_uid,to_username) {
	if(check_user_login()){
		if (uid == to_uid) {
			showDialog('无法给自己发送站内短信', 'alert', '操作提示');
					return false;
		}
		var to_task_id = arguments[2] ? arguments[2] : 0;
		var url = '/index.php?do=ajax&view=message&op=send&to_uid=' + to_uid + '&to_username=' + to_username;

		if (task_id) {
			url += '&to_task_id=' + to_task_id;
		}
		showWindow('message',encodeURI(url));
		return false;
	}
}
/**
 * 交易维权 *请在外部定义basic_url参数
 * 
 * @param string
 *            obj 维权对象 当type=1 obj=task/work; type=2 obj=user
 * @param string
 *            type 维权类型 1=>举报,2=>投诉
 * @param string
 *            obj_id 对象编号
 * @param int
 *            to_uid 被举报人
 * @param string
 *            to_username 被举报人名称
 */
function report( obj, type,obj_id,to_uid,to_username) {
	
	if (check_user_login()) {
		var s='';
		if(type=='1') s='举报';else if(type=='2') s="投诉";
		if(uid==to_uid){
			showDialog("无法对自己发起"+s,"alert","操作提示");return false;
		}else{
			var url = encodeURI('/index.php?do=ajax&view=task&ajax=report&task_id='+task_id+'&op=report&type='+type+'&obj='+obj+'&obj_id='+obj_id+'&to_uid='+to_uid+'&to_username='+to_username);
			showWindow("report",url,'get','1');
		}
	}
}
function addFav(name,url){
		if (document.all){
	     	window.external.addFavorite(url,name);
		}else if (window.sidebar){
	     	window.sidebar.addPanel(name, url, "");
		}
	}
	
function setHomepage(url){
	if (document.all){
        document.body.style.behavior='url(#default#homepage)';
       	document.body.setHomePage(url);
    }else if (window.sidebar){
		if(window.netscape){
	         try{ 
	            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); 
	         } 
	         catch (e) { 
	        	 alert("this action was aviod by your browser，if you want to enable，please enter about:config in your address line,and change the value of signed.applets.codebase_principal_support to true");
	         }
		 } 
		var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
		prefs.setCharPref('browser.startup.homepage', url);

	}
}




 
var STYLEID = '1', STATICURL = '', IMGDIR = '/resource/img/keke', VERHASH = 'cC0', charset = 'gbk', keke_uid = '0', cookiepre = '', cookiedomain = '', cookiepath = '', attackevasive = '0', disallowfloat = '', creditnotice = ''
var BROWSER = {};
var USERAGENT = navigator.userAgent.toLowerCase();
browserVersion({'ie':'msie','firefox':'','chrome':'','opera':'','safari':'','maxthon':'','mozilla':'','webkit':''});
/*
 * if(BROWSER.safari) { BROWSER.firefox = true; }
 */
BROWSER.opera = BROWSER.opera ? opera.version() : 0;

var CSSLOADED = [];
var JSMENU = [];
JSMENU['active'] = [];
JSMENU['timer'] = [];
JSMENU['drag'] = [];
JSMENU['layer'] = 0;
JSMENU['zIndex'] = {'win':1200,'menu':1300,'dialog':1400,'prompt':1500};
JSMENU['float'] = '';
var AJAX = [];
AJAX['url'] = [];
AJAX['stack'] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var CURRENTSTYPE = null;
var keke_uid = isUndefined(keke_uid) ? 0 : keke_uid;
var creditnotice = isUndefined(creditnotice) ? '' : creditnotice;
var cookiedomain = isUndefined(cookiedomain) ? '' : cookiedomain;
var cookiepath = isUndefined(cookiepath) ? '' : cookiepath;

var KEKECODE = [];
KEKECODE['num'] = '-1';
KEKECODE['html'] = [];

var USERABOUT_BOX = true;

function browserVersion(types) {
	var other = 1;
	for(i in types) {
		var v = types[i] ? types[i] : i;
		if(USERAGENT.indexOf(v) != -1) {
			var re = new RegExp(v + '(\\/|\\s)([\\d\\.]+)', 'ig');
			var matches = re.exec(USERAGENT);
			var ver = matches != null ? matches[2] : 0;
			other = ver !== 0 ? 0 : other;
		}else {
			var ver = 0;
		}
		eval('BROWSER.' + i + '= ver');
	}
	BROWSER.other = other;
}

function getEvent() {
	if(document.all) return window.event;
	func = getEvent.caller;
	while(func != null) {
		var arg0 = func.arguments[0];
		if (arg0) {
			if((arg0.constructor  == Event || arg0.constructor == MouseEvent) || (typeof(arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
				return arg0;
			}
		}
		func=func.caller;
	}
	return null;
}

function isUndefined(variable) {
	return typeof variable == 'undefined' ? true : false;
}

function in_array(needle, haystack) {
	if(typeof needle == 'string' || typeof needle == 'number') {
		for(var i in haystack) {
			if(haystack[i] == needle) {
					return true;
			}
		}
	}
	return false;
}

function trim(str) {
	return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '');
}

function strlen(str) {
	return (BROWSER.ie && str.indexOf('\n') != -1) ? str.replace(/\r?\n/g, '_').length : str.length;
}

function mb_strlen(str) {
	var len = 0;
	for(var i = 0; i < str.length; i++) {
		len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? (charset == 'utf-8' ? 3 : 2) : 1;
	}
	return len;
}

function mb_cutstr(str, maxlen, dot) {
	var len = 0;
	var ret = '';
	var dot = !dot ? '...' : '';
	maxlen = maxlen - dot.length;
	for(var i = 0; i < str.length; i++) {
		len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? (charset == 'utf-8' ? 3 : 2) : 1;
		if(len > maxlen) {
			ret += dot;
			break;
		}
		ret += str.substr(i, 1);
	}
	return ret;
}

if(BROWSER.firefox && window.HTMLElement) {
	HTMLElement.prototype.__defineSetter__('outerHTML', function(sHTML) {
			var r = this.ownerDocument.createRange();
		r.setStartBefore(this);
		var df = r.createContextualFragment(sHTML);
		this.parentNode.replaceChild(df,this);
		return sHTML;
	});

	HTMLElement.prototype.__defineGetter__('outerHTML', function() {
		var attr;
		var attrs = this.attributes;
		var str = '<' + this.tagName.toLowerCase();
		for(var i = 0;i < attrs.length;i++){
			attr = attrs[i];
			if(attr.specified)
			str += ' ' + attr.name + '="' + attr.value + '"';
		}
		if(!this.canHaveChildren) {
			return str + '>';
		}
		return str + '>' + this.innerHTML + '</' + this.tagName.toLowerCase() + '>';
		});

	HTMLElement.prototype.__defineGetter__('canHaveChildren', function() {
		switch(this.tagName.toLowerCase()) {
			case 'area':case 'base':case 'basefont':case 'col':case 'frame':case 'hr':case 'img':case 'br':case 'input':case 'isindex':case 'link':case 'meta':case 'param':
			return false;
			}
		return true;
	});
}

function setcookie(cookieName, cookieValue, seconds, path, domain, secure) {
	var expires = new Date();
	cookieName = cookiepre + cookieName;
	expires.setTime(expires.getTime() + seconds * 1000);
	domain = !domain ? cookiedomain : domain;
	path = !path ? cookiepath : path;
	document.cookie = escape(cookieName) + '=' + escape(cookieValue)
		+ (expires ? '; expires=' + expires.toGMTString() : '')
		+ (path ? '; path=' + path : '/')
		+ (domain ? '; domain=' + domain : '')
		+ (secure ? '; secure' : '');
}

function getcookie(name) {
	name = cookiepre + name;
	var cookie_start = document.cookie.indexOf(name);
	var cookie_end = document.cookie.indexOf(";", cookie_start);
	return cookie_start == -1 ? '' : unescape(decodeURI(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length))));
}

function thumbImg(obj, method) {
	if(!obj) {
		return;
	}
	obj.onload = null;
	file = obj.src;
	zw = obj.offsetWidth;
	zh = obj.offsetHeight;
	if(zw < 2) {
		if(!obj.id) {
			obj.id = 'img_' + Math.random();
		}
		setTimeout("thumbImg(document.getElementById('" + obj.id + "'), " + method + ")", 100);
		return;
	}
	zr = zw / zh;
	method = !method ? 0 : 1;
	if(method) {
		fixw = obj.getAttribute('_width');
		fixh = obj.getAttribute('_height');
		if(zw > fixw) {
			zw = fixw;
			zh = zw / zr;
		}
		if(zh > fixh) {
			zh = fixh;
			zw = zh * zr;
		}
	} else {
		var imagemaxwidth = isUndefined(imagemaxwidth) ? '600' : imagemaxwidth;
		var widthary = imagemaxwidth.split('%');
		if(widthary.length > 1) {
			fixw = document.getElementById('wrap').clientWidth - 200;
			if(widthary[0]) {
				fixw = fixw * widthary[0] / 100;
			} else if(widthary[1]) {
				fixw = fixw < widthary[1] ? fixw : widthary[1];
			}
		} else {
			fixw = widthary[0];
		}
		if(zw > fixw) {
			zw = fixw;
			zh = zw / zr;
			obj.style.cursor = 'pointer';
			if(!obj.onclick) {
				obj.onclick = function() {
					zoom(obj, obj.src);
				};
			}
		}
	}
	obj.width = zw;
	obj.height = zh;
}

function thumbtaskImg(obj, method) {
	if(!obj) {
		return;
	}
	obj.onload = null;
	file = obj.src;
	zw = obj.offsetWidth;
	zh = obj.offsetHeight;
	if(zw < 2) {
		if(!obj.id) {
			obj.id = 'img_' + Math.random();
		}
		setTimeout("thumbImg(document.getElementById('" + obj.id + "'), " + method + ")", 100);
		return;
	}
	zr = zw / zh;
	method = !method ? 0 : 1;
	if(method) {
		fixw = obj.getAttribute('_width');
		fixh = obj.getAttribute('_height');
		if(zw > fixw) {
			zw = fixw;
			zh = zw / zr;
		}
		if(zh > fixh) {
			zh = fixh;
			zw = zh * zr;
		}
	} else {
		obj.style.cursor = 'pointer';
		if(!obj.onclick) {
			obj.onclick = function() {
				zoom(obj, obj.alt);
			};
		}
	}
	obj.width = zw;
	obj.height = zh;
}

var zoomclick = 0, zoomstatus = 1;
function zoom(obj, zimg) {
	zimg = !zimg ? obj.src : zimg;
	if(!zoomstatus) {
		window.open(zimg, '', '');
		return;
	}
	if(!obj.id) obj.id = 'img_' + Math.random();
	var menuid = obj.id + '_zmenu';
	var menu = document.getElementById(menuid);
	var imgid = menuid + '_img';
	var zoomid = menuid + '_zimg';
	var maxh = (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight) - 70;

	if(!menu) {
		menu = document.createElement('div');
		menu.id = menuid;
		var objpos = fetchOffset(obj);
		menu.innerHTML = '<div onclick="document.getElementById(\'append_parent\').removeChild(document.getElementById(\'' + obj.id + '_zmenu\'))" style="z-index:600;filter:alpha(opacity=50);opacity:0.5;background:#FFF;position:absolute;width:' + obj.clientWidth + 'px;height:' + obj.clientHeight + 'px;left:' + objpos['left'] + 'px;top:' + objpos['top'] + 'px"><table width="100%" height="100%"><tr><td valign="middle" align="center"><img src="' + IMGDIR + '/loading.gif" /></td></tr></table></div>' +
			'<div style="position:absolute;top:-100000px;display:none"><img id="' + imgid + '" src="' + zimg + '"></div>';
		document.getElementById('append_parent').appendChild(menu);
		document.getElementById(imgid).onload = function() {
			document.getElementById(imgid).parentNode.style.display = '';
			var imgw = document.getElementById(imgid).width;
			var imgh = document.getElementById(imgid).height;
			var r = imgw / imgh;
			var w = document.body.clientWidth * 0.95;
			w = imgw > w ? w : imgw;
			var h = w / r;
			if(h > maxh) {
				h = maxh;
				w = h * r;
			}
			document.getElementById('append_parent').removeChild(menu);
			menu = document.createElement('div');
			menu.id = menuid;
			menu.style.overflow = 'visible';
			menu.style.width = (w < 300 ? 300 : w) + 20 + 'px';
			menu.style.height = h  + 'px';
			menu.innerHTML = '<div class="zoominner"><p id="' + menuid + '_ctrl"><span class="y"><a href="' + zimg + '" class="imglink" target="_blank" title="在新窗口打开">在新窗口打开</a><a href="javascipt:;" id="' + menuid + '_adjust" class="imgadjust" title="实际大小">实际大小</a><a href="javascript:;" onclick="hideMenu()" class="imgclose" title="关闭">关闭</a></span><span class="red">鼠标滚轮可缩放，按住拖动可以移动</span></p><div align="center" onmousedown="zoomclick=1" onmousemove="zoomclick=2" onmouseup="if(zoomclick==1) hideMenu()"><img id="' + zoomid + '" src="' + zimg + '" width="' + w + '" height="' + h + '" w="' + imgw + '" h="' + imgh + '"></div></div>';
			document.getElementById('append_parent').appendChild(menu);
			document.getElementById(menuid + '_adjust').onclick = function(e) {adjust(e, 1)};
			/*
			 * if(BROWSER.ie){ menu.onmousewheel = adjust; } else {
			 * menu.addEventListener('DOMMouseScroll', adjust, false); }
			 */
			
			if(menu.addEventListener){/* firefox */
				menu.addEventListener('DOMMouseScroll',adjust,false);
			}// IE/Opera/Chrome
				menu.onmousewheel=adjust;
			
			showMenu({'menuid':menuid,'duration':3,'pos':'00','cover':1,'drag':menuid,'maxh':maxh+70});
		};
	} else {
		showMenu({'menuid':menuid,'duration':3,'pos':'00','cover':1,'drag':menuid,'maxh':menu.clientHeight});
	}
	if(BROWSER.ie) doane(event);
	var adjust = function(e, a) {
		var imgw = document.getElementById(zoomid).getAttribute('w');
		var imgh = document.getElementById(zoomid).getAttribute('h');
		var imgwstep = imgw / 10;
		var imghstep = imgh / 10;
		if(!a) {
			if(!e) e = window.event;
			if(e.altKey || e.shiftKey || e.ctrlKey) return;
			if(e.wheelDelta <= 0 || e.detail > 0) {
				if(document.getElementById(zoomid).width - imgwstep <= 200 || document.getElementById(zoomid).height - imghstep <= 200) {
					doane(e);return;
				}
				document.getElementById(zoomid).width -= imgwstep;
				document.getElementById(zoomid).height -= imghstep;
			} else {
				if(document.getElementById(zoomid).width + imgwstep >= imgw) {
					doane(e);return;
				}
				document.getElementById(zoomid).width += imgwstep;
				document.getElementById(zoomid).height += imghstep;
			}
		} else {
			document.getElementById(zoomid).width = imgw;
			document.getElementById(zoomid).height = imgh;
		}
		menu.style.width = (parseInt(document.getElementById(zoomid).width < 300 ? 300 : parseInt(document.getElementById(zoomid).width)) + 20) + 'px';
		menu.style.height = (parseInt(document.getElementById(zoomid).height) + 50) + 'px';
		setMenuPosition('', menuid, '00');
		doane(e);
	};
}



function showMenu(v) {
	var ctrlid = isUndefined(v['ctrlid']) ? v : v['ctrlid'];
	var showid = isUndefined(v['showid']) ? ctrlid : v['showid'];
	var menuid = isUndefined(v['menuid']) ? showid + '_menu' : v['menuid'];
	var ctrlObj = document.getElementById(ctrlid);
	var menuObj = document.getElementById(menuid);
	if(!menuObj) return;
	var mtype = isUndefined(v['mtype']) ? 'menu' : v['mtype'];
	var evt = isUndefined(v['evt']) ? 'mouseover' : v['evt'];
	var pos = isUndefined(v['pos']) ? '43' : v['pos'];
	var layer = isUndefined(v['layer']) ? 1 : v['layer'];
	var duration = isUndefined(v['duration']) ? 2 : v['duration'];
	var timeout = isUndefined(v['timeout']) ? 250 : v['timeout'];
	var maxh = isUndefined(v['maxh']) ? 600 : v['maxh'];
	var cache = isUndefined(v['cache']) ? 1 : v['cache'];
	var drag = isUndefined(v['drag']) ? '' : v['drag'];
	var dragobj = drag && document.getElementById(drag) ? document.getElementById(drag) : menuObj;
	var fade = isUndefined(v['fade']) ? 0 : v['fade'];
	var cover = isUndefined(v['cover']) ? 0 : v['cover'];
	var zindex = isUndefined(v['zindex']) ? JSMENU['zIndex']['menu'] : v['zindex'];
	zindex = cover ? zindex + 200 : zindex;
	if(typeof JSMENU['active'][layer] == 'undefined') {
		JSMENU['active'][layer] = [];

	}

	if(evt == 'click' && in_array(menuid, JSMENU['active'][layer]) && mtype != 'win') {
		hideMenu(menuid, mtype);
		return;
	}
	if(mtype == 'menu') {
		hideMenu(layer, mtype);
	}

	if(ctrlObj) {
		if(!ctrlObj.initialized) {
			ctrlObj.initialized = true;
			ctrlObj.unselectable = true;

			ctrlObj.outfunc = typeof ctrlObj.onmouseout == 'function' ? ctrlObj.onmouseout : null;
			ctrlObj.onmouseout = function() {
				if(this.outfunc) this.outfunc();
				if(duration < 3 && !JSMENU['timer'][menuid]) JSMENU['timer'][menuid] = setTimeout('hideMenu(\'' + menuid + '\', \'' + mtype + '\')', timeout);
			};

			ctrlObj.overfunc = typeof ctrlObj.onmouseover == 'function' ? ctrlObj.onmouseover : null;
			ctrlObj.onmouseover = function(e) {
				doane(e);
				if(this.overfunc) this.overfunc();
				if(evt == 'click') {
					clearTimeout(JSMENU['timer'][menuid]);
					JSMENU['timer'][menuid] = null;
				} else {
					for(var i in JSMENU['timer']) {
						if(JSMENU['timer'][i]) {
							clearTimeout(JSMENU['timer'][i]);
							JSMENU['timer'][i] = null;
						}
					}
				}
			};
		}
	}

	var dragMenu = function(menuObj, e, op) {
		e = e ? e : window.event;
		if(op == 1) {
			if(in_array(BROWSER.ie ? e.srcElement.tagName : e.target.tagName, ['TEXTAREA', 'INPUT', 'BUTTON', 'SELECT'])) {
				return;
			}
			JSMENU['drag'] = [e.clientX, e.clientY];
			JSMENU['drag'][2] = parseInt(menuObj.style.left);
			JSMENU['drag'][3] = parseInt(menuObj.style.top);
			document.onmousemove = function(e) {try{dragMenu(menuObj, e, 2);}catch(err){}};
			document.onmouseup = function(e) {try{dragMenu(menuObj, e, 3);}catch(err){}};
			doane(e);
		}else if(op == 2 && JSMENU['drag'][0]) {
			var menudragnow = [e.clientX, e.clientY];
			menuObj.style.left = (JSMENU['drag'][2] + menudragnow[0] - JSMENU['drag'][0]) + 'px';
			menuObj.style.top = (JSMENU['drag'][3] + menudragnow[1] - JSMENU['drag'][1]) + 'px';
			doane(e);
		}else if(op == 3) {
			JSMENU['drag'] = [];
			document.onmousemove = null;
			document.onmouseup = null;
		}
	};

	if(!menuObj.initialized) {
		menuObj.initialized = true;
		menuObj.ctrlkey = ctrlid;
		menuObj.mtype = mtype;
		menuObj.layer = layer;
		menuObj.cover = cover;
		if(ctrlObj && ctrlObj.getAttribute('fwin')) {menuObj.scrolly = true;}
		menuObj.style.position = 'absolute';
		menuObj.style.zIndex = zindex + layer;
		menuObj.onclick = function(e) {
			if(!e || BROWSER.ie) {
				window.event.cancelBubble = true;
				return window.event;
			} else {
				e.stopPropagation();
				return e;
			}
		};
		if(duration < 3) {
			if(duration > 1) {
				menuObj.onmouseover = function() {
					clearTimeout(JSMENU['timer'][menuid]);
					JSMENU['timer'][menuid] = null;
				};
			}
			if(duration != 1) {
				menuObj.onmouseout = function() {
					JSMENU['timer'][menuid] = setTimeout('hideMenu(\'' + menuid + '\', \'' + mtype + '\')', timeout);
				};
			}
		}
		if(cover) {
			var coverObj = document.createElement('div');
			coverObj.id = menuid + '_cover';
			coverObj.style.position = 'absolute';
			coverObj.style.zIndex = menuObj.style.zIndex - 1;
			coverObj.style.left = coverObj.style.top = '0px';
			coverObj.style.width = '100%';
			coverObj.style.height = Math.max(document.documentElement.clientHeight, document.body.offsetHeight)+ 'px';
			coverObj.style.backgroundColor = '#000';
			coverObj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=50)';
			coverObj.style.opacity = 0.5;
			coverObj.onclick = function () { hideMenu(); };
			document.getElementById('append_parent').appendChild(coverObj);
			_attachEvent(window, 'load', function () {
				coverObj.style.height = Math.max(document.documentElement.clientHeight, document.body.offsetHeight)+ 'px';
			}, document);
		}
	}
	if(drag) {
		dragobj.style.cursor = 'move';
		dragobj.onmousedown = function(event) {try{dragMenu(menuObj, event, 1);}catch(e){}};
	}
	menuObj.style.display = '';
	if(cover) document.getElementById(menuid + '_cover').style.display = '';
	if(fade) {
		var O = 0;
		var fadeIn = function(O) {
			if(O == 100) {
				clearTimeout(fadeInTimer);
				return;
			}
			menuObj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + O + ')';
			menuObj.style.opacity = O / 100;
			O += 10;
			var fadeInTimer = setTimeout(function () {
				fadeIn(O);
			}, 50);
		};
		fadeIn(O);
		menuObj.fade = true;
	} else {
		menuObj.fade = false;
	}
	setMenuPosition(showid, menuid, pos);
	if(maxh && menuObj.scrollHeight > maxh) {
		menuObj.style.height = maxh + 'px';
		if(BROWSER.opera) {
			menuObj.style.overflow = 'auto';
		} else {
			menuObj.style.overflowY = 'auto';
		}
	}

	if(!duration) {
		setTimeout('hideMenu(\'' + menuid + '\', \'' + mtype + '\')', timeout);
	}

	if(!in_array(menuid, JSMENU['active'][layer])) JSMENU['active'][layer].push(menuid);
	menuObj.cache = cache;
	if(layer > JSMENU['layer']) {
		JSMENU['layer'] = layer;
	}
}

function setMenuPosition(showid, menuid, pos) {
	function checkmenuobj(menuObj) {
		while((menuObj = menuObj.offsetParent) != null) {
			if(menuObj.style.position == 'absolute') {
				return 2;
			}
		}
		return 1;
	}
	var showObj = document.getElementById(showid);
	var menuObj = menuid ? document.getElementById(menuid) : document.getElementById(showid + '_menu');
	if(isUndefined(pos)) pos = '43';
	var basePoint = parseInt(pos.substr(0, 1));
	var direction = parseInt(pos.substr(1, 1));
	var sxy = sx = sy = sw = sh = ml = mt = mw = mcw = mh = mch = bpl = bpt = 0;

	if(!menuObj || (basePoint > 0 && !showObj)) return;
	if(showObj) {
		sxy = fetchOffset(showObj, BROWSER.ie && BROWSER.ie < 7 ? checkmenuobj(menuObj) : 0);
		sx = sxy['left'];
		sy = sxy['top'];
		sw = showObj.offsetWidth;
		sh = showObj.offsetHeight;
	}
	mw = menuObj.offsetWidth;
	mcw = menuObj.clientWidth;
	mh = menuObj.offsetHeight;
	mch = menuObj.clientHeight;

	switch(basePoint) {
		case 1:
			bpl = sx;
			bpt = sy;
			break;
		case 2:
			bpl = sx + sw;
			bpt = sy;
			break;
		case 3:
			bpl = sx + sw;
			bpt = sy + sh;
			break;
		case 4:
			bpl = sx;
			bpt = sy + sh;
			break;
	}
	switch(direction) {
		case 0:
			menuObj.style.left = (document.body.clientWidth - menuObj.clientWidth) / 2 + 'px';
			mt = (document.documentElement.clientHeight - menuObj.clientHeight) / 2;
			break;
		case 1:
			ml = bpl - mw;
			mt = bpt - mh;
			break;
		case 2:
			ml = bpl;
			mt = bpt - mh;
			break;
		case 3:
			ml = bpl;
			mt = bpt;
			break;
		case 4:
			ml = bpl - mw;
			mt = bpt;
			break;
	}
	var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
	var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
	if(in_array(direction, [1, 4]) && ml < 0) {
		ml = bpl;
		if(in_array(basePoint, [1, 4])) ml += sw;
	} else if(ml + mw > scrollLeft + document.body.clientWidth && sx >= mw) {
		ml = bpl - mw;
		if(in_array(basePoint, [2, 3])) ml -= sw;
	}
	if(in_array(direction, [1, 2]) && mt < 0) {
		mt = bpt;
		if(in_array(basePoint, [1, 2])) mt += sh;
	} else if(mt + mh > scrollTop + document.documentElement.clientHeight && sy >= mh) {
		mt = bpt - mh;
		if(in_array(basePoint, [3, 4])) mt -= sh;
	}
	if(pos == '210') {
		ml += 69 - sw / 2;
		mt -= 5;
		if(showObj.tagName == 'TEXTAREA') {
			ml -= sw / 2;
			mt += sh / 2;
		}
	}
	if(direction == 0 || menuObj.scrolly) {
		if(BROWSER.ie && BROWSER.ie < 7) {
			if(direction == 0) mt += scrollTop;
		} else {
			if(menuObj.scrolly) mt -= scrollTop;
			menuObj.style.position = 'fixed';
		}
	}
	if(ml) menuObj.style.left = ml + 'px';
	if(mt) menuObj.style.top = mt + 'px';
	if(direction == 0 && BROWSER.ie && !document.documentElement.clientHeight) {
		menuObj.style.position = 'absolute';
		menuObj.style.top = (document.body.clientHeight - menuObj.clientHeight) / 2 + 'px';
	}
	if(menuObj.style.clip && !BROWSER.opera) {
		menuObj.style.clip = 'rect(auto, auto, auto, auto)';
	}
}

function doane(event) {
	e = event ? event : window.event;
	if(!e) e = getEvent();
	if(BROWSER.ie && typeof(e)!='undefined') {
		e.returnValue = false;
		e.cancelBubble = true;
	} else if(e) {
		e.stopPropagation();
		e.preventDefault();
	}
}

function _attachEvent(obj, evt, func, eventobj) {
	eventobj = !eventobj ? obj : eventobj;
	if(obj.addEventListener) {
		obj.addEventListener(evt, func, false);
	} else if(eventobj.attachEvent) {
		obj.attachEvent('on' + evt, func);
	}
}

function _detachEvent(obj, evt, func, eventobj) {
	eventobj = !eventobj ? obj : eventobj;
	if(obj.removeEventListener) {
		obj.removeEventListener(evt, func, false);
	} else if(eventobj.detachEvent) {
		obj.detachEvent('on' + evt, func);
	}
}

function fetchOffset(obj, mode) {
	var left_offset = 0, top_offset = 0, mode = !mode ? 0 : mode;

	if(obj.getBoundingClientRect && !mode) {
		var rect = obj.getBoundingClientRect();
		var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
		var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
		if(document.documentElement.dir == 'rtl') {
			scrollLeft = scrollLeft + document.documentElement.clientWidth - document.documentElement.scrollWidth;
		}
		left_offset = rect.left + scrollLeft - document.documentElement.clientLeft;
		top_offset = rect.top + scrollTop - document.documentElement.clientTop;
	}
	if(left_offset <= 0 || top_offset <= 0) {
		left_offset = obj.offsetLeft;
		top_offset = obj.offsetTop;
		while((obj = obj.offsetParent) != null) {
			if(mode == 2 && obj.style.position == 'absolute') {
				continue;
			}
			left_offset += obj.offsetLeft;
			top_offset += obj.offsetTop;
		}
	}
	return {'left' : left_offset, 'top' : top_offset};
}

function hideMenu(attr, mtype) {
	attr = isUndefined(attr) ? '' : attr;
	mtype = isUndefined(mtype) ? 'menu' : mtype;
	if(attr == '') {
		for(var i = 1; i <= JSMENU['layer']; i++) {
			hideMenu(i, mtype);
		}
		return;
	} else if(typeof attr == 'number') {
		for(var j in JSMENU['active'][attr]) {
			hideMenu(JSMENU['active'][attr][j], mtype);
		}
		return;
	}else if(typeof attr == 'string') {
		var menuObj = document.getElementById(attr);
		if(!menuObj || (mtype && menuObj.mtype != mtype)) return;
		clearTimeout(JSMENU['timer'][attr]);
		var hide = function() {
			if(menuObj.cache) {
				menuObj.style.display = 'none';
				if(menuObj.cover) document.getElementById(attr + '_cover').style.display = 'none';
			}else {
				menuObj.parentNode.removeChild(menuObj);
				if(menuObj.cover) document.getElementById(attr + '_cover').parentNode.removeChild(document.getElementById(attr + '_cover'));
			}
			var tmp = [];
			for(var k in JSMENU['active'][menuObj.layer]) {
				if(attr != JSMENU['active'][menuObj.layer][k]) tmp.push(JSMENU['active'][menuObj.layer][k]);
			}
			JSMENU['active'][menuObj.layer] = tmp;
		};
		if(menuObj.fade) {
			var O = 100;
			var fadeOut = function(O) {
				if(O == 0) {
					clearTimeout(fadeOutTimer);
					hide();
					return;
				}
				menuObj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + O + ')';
				menuObj.style.opacity = O / 100;
				O -= 10;
				var fadeOutTimer = setTimeout(function () {
					fadeOut(O);
				}, 50);
			};
			fadeOut(O);
		} else {
			hide();
		}
	}
}



function showDialog(msg, mode, t, func, cover, funccancel,auto,ok_txt,cancel_txt) {
	cover = isUndefined(cover) ? (mode == 'info' ? 0 : 1) : cover;
	mode = in_array(mode, ['confirm', 'notice', 'info','right']) ? mode : 'alert';
	if(typeof(ROOTURL)=='undefined'){
		var confirm='确定';
	}else{
		var confirm='確定';
	}
	ok_txt     = ok_txt ? ok_txt : confirm;
	cancel_txt = cancel_txt ? cancel_txt : "取消";
	var auto = auto==1?1:0;
	var menuid = 'fwin_dialog';
	var menuObj = document.getElementById(menuid);

	if(menuObj) hideMenu('fwin_dialog', 'dialog');
	menuObj = document.createElement('div');
	menuObj.style.display = 'none';
	menuObj.className = 'fwinmask';
	menuObj.id = menuid;
	document.getElementById('append_parent').appendChild(menuObj);
	var s = '<table cellpadding="0" cellspacing="0" class="fwin"><tr><td class="tt_l"></td><td class="tt_c"></td><td class="tt_r"></td></tr><tr><td class="m_l"></td><td class="m_c"><h3 class="flb"><em>';
	s += t ? t : '提示信息';
	s += '</em><span><a href="javascript:;" id="fwin_dialog_close" class="flbc" onclick="hideMenu(\'' + menuid + '\', \'dialog\')" title="关闭">关闭</a></span></h3>';
	if(mode == 'info') {
		s += msg ? msg : '';
	} else {
		s += '<div class="c' + (mode == 'info' ? '' : ' altw') + '"><div class="' + (mode == 'alert' ? 'alert_error' :mode=='confirm'?'confirm_info':mode=='right'?'alert_right':'alert_info') + '"><p>' + msg + '</p></div></div>';
		s += '<p class="o pns"><button id="fwin_dialog_submit" value="true" class="pn pnc"><strong>'+ok_txt+'</strong></button>';
		s += mode == 'confirm' ? '<button id="fwin_dialog_cancel" value="true" class="pn" onclick="hideMenu(\'' + menuid + '\', \'dialog\')"><strong>'+cancel_txt+'</strong></button>' : '';
		s += '</p>';
	}
	s += '</td><td class="m_r"></td></tr><tr><td class="b_l"></td><td class="b_c"></td><td class="b_r"></td></tr></table>';
	menuObj.innerHTML = s;
	if(document.getElementById('fwin_dialog_submit')) document.getElementById('fwin_dialog_submit').onclick = function() {
		if(typeof func == 'function') func();
		else eval(func);
		hideMenu(menuid, 'dialog');
	};
	if(auto){
		if(typeof func == 'function') func();
		else eval(func);
		hideMenu(menuid, 'dialog');
	}
	if(document.getElementById('fwin_dialog_cancel')) {
		document.getElementById('fwin_dialog_cancel').onclick = function() {
			if(typeof funccancel == 'function') funccancel();
			else eval(funccancel);
			hideMenu(menuid, 'dialog');
		};
		document.getElementById('fwin_dialog_close').onclick = document.getElementById('fwin_dialog_cancel').onclick;
	}
	showMenu({'mtype':'dialog','menuid':menuid,'duration':3,'pos':'00','zindex':JSMENU['zIndex']['dialog'],'cache':0,'cover':cover});
}

function showWindow(k, url, mode, cache, menuv,recall) {

	mode = isUndefined(mode) ? 'get' : mode;
	cache = isUndefined(cache) ? 1 : cache;
	var menuid = 'fwin_' + k;
	var menuObj = document.getElementById(menuid);
	var drag = null;
	var loadingst = null;

	if(disallowfloat && disallowfloat.indexOf(k) != -1) {
	
		if(BROWSER.ie) url += (url.indexOf('?') != -1 ?  '&' : '?') + 'referer=' + escape(location.href);
		
		location.href = url;
		return;
	}
    var func = function() {
		
	 if(typeof recall == 'function') {
	 	
	 	   recall();
		} else {
			
			eval(recall);
		}
	};

	var fetchContent = function() {

		if(mode == 'get') {
			
			menuObj.url = url;
			url += (url.search(/\?/) > 0 ? '&' : '?') + 'infloat=yes&handlekey=' + k;
			url += cache == -1 ? '&t='+(+ new Date()) : '';
			ajaxget(url, 'fwin_content_' + k, 'ajaxwaitid', '请稍候...', '', function() {initMenu();show();func();});
		} else if(mode == 'post') {
			
			menuObj.act = document.getElementById(url).action;
			btnObj = document.getElementsByTagName('button');
			var submitObj = '';
			for(var i=0;i<btnObj.length;i++){
				if(document.getElementById(url).elements[btnObj[i]['name']]){
					submitObj = btnObj[i];
				}
			}
			ajaxpost(url, 'fwin_content_' + k, '', '', submitObj, function() {initMenu();show();func();});
		}
		loadingst = setTimeout(function() {showDialog('', 'info', '<img src="' + IMGDIR + '/loading.gif"> 请稍候...')}, 500);
	};
	
	var initMenu = function() {
		clearTimeout(loadingst);
		var objs = menuObj.getElementsByTagName('*');
		var fctrlidinit = false;
		for(var i = 0; i < objs.length; i++) {
			if(objs[i].id) {
				objs[i].setAttribute('fwin', k);
			}
			if(objs[i].className == 'flb' && !fctrlidinit) {
				if(!objs[i].id) objs[i].id = 'fctrl_' + k;
				drag = objs[i].id;
				fctrlidinit = true;
			}
		}
	};
	
	var show = function() {
		hideMenu('fwin_dialog', 'dialog');
		v = {'mtype':'win','menuid':menuid,'duration':3,'pos':'00','zindex':JSMENU['zIndex']['win'],'drag':typeof drag == null ? '' : drag,'cache':cache};
		for(k in menuv) {
			v[k] = menuv[k];
		}
		showMenu(v);
	};
 
	if(!menuObj) {
		 
		menuObj = document.createElement('div');
		menuObj.id = menuid;
		menuObj.className = 'fwinmask';
		menuObj.style.display = 'none';
		document.getElementById('append_parent').appendChild(menuObj);
		menuObj.innerHTML = '<table cellpadding="0" cellspacing="0" class="fwin"><tr><td class="tt_l"></td><td class="tt_c" ondblclick="hideWindow(\'' + k + '\')"></td><td class="tt_r"></td></tr><tr><td class="m_l" ondblclick="hideWindow(\'' + k + '\')"></td><td class="m_c" id="fwin_content_' + k + '">'
			+ '</td><td class="m_r" ondblclick="hideWindow(\'' + k + '\')"></td></tr><tr><td class="b_l"></td><td class="b_c" ondblclick="hideWindow(\'' + k + '\')"></td><td class="b_r"></td></tr></table>';
	
		if (mode == 'html') {
			
			document.getElementById('fwin_content_' + k).innerHTML = url;
			initMenu();
			show();
			
		} else {
			fetchContent();
			 
		}
	} else if((mode == 'get' && url != menuObj.url) || (mode == 'post' && document.getElementById(url).action != menuObj.act)) {


		fetchContent();
		 
	} else {
		 
		show();
	}
	
	doane();
}

function hideWindow(k, all) {
	all = isUndefined(all) ? 1 : all;
	hideMenu('fwin_' + k, 'win');
	if(all) {
		hideMenu();
	}
	hideMenu('', 'prompt');
}

//另外生成一个formhash
function getNewFormhash(){
	var nodes = document.all; 
	for(var i=0;i<nodes.length;i++){ 
	    var o = nodes[i]; 
	    if(o.name == 'formhash'){
	    	$.ajax({
    		   type: "GET",
    		   async: false,
    		   url: '/index.php?do=ajax&view=ajax&ac=formhash',
    		   success: function(msg){
    			   o.value = msg;
    		   }
    		});
	    }
	} 
}

function Ajax(recvType, waitId) {

	for(var stackId = 0; stackId < AJAX['stack'].length && AJAX['stack'][stackId] != 0; stackId++);
	AJAX['stack'][stackId] = 1;

	var aj = new Object();
 	aj.loading = 'loading...';
	aj.recvType = recvType ? recvType : 'XML';
	aj.waitId = waitId ? document.getElementById(waitId) :'ajaxwaitid';
   
	aj.resultHandle = null;
	aj.sendString = '';
	aj.targetUrl = '';
	aj.stackId = 0;
	aj.stackId = stackId;

	aj.setLoading = function(loading) {
		if(typeof loading !== 'undefined' && loading !== null) aj.loading = loading;
	};

	aj.setRecvType = function(recvtype) {
		aj.recvType = recvtype;
	};
 
	aj.setWaitId = function(waitid) {
		aj.waitId = typeof waitid == 'object' ? waitid : "ajaxwaitid";
	};
    
	aj.createXMLHttpRequest = function() {
		var request = false;
		if(window.XMLHttpRequest) {
			request = new XMLHttpRequest();
			if(request.overrideMimeType) {
				request.overrideMimeType('text/xml');
			}
		} else if(window.ActiveXObject) {
			var versions = ['Microsoft.XMLHTTP', 'MSXML.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.7.0', 'Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];
			for(var i=0; i<versions.length; i++) {
				try {
					request = new ActiveXObject(versions[i]);
					if(request) {
						return request;
					}
				} catch(e) {}
			}
		}
		return request;
	};

	aj.XMLHttpRequest = aj.createXMLHttpRequest();
	aj.showLoading = function() {
		if(aj.waitId && (aj.XMLHttpRequest.readyState != 4 || aj.XMLHttpRequest.status != 200)) {
			$("#"+aj.waitId).fadeIn();
 		}
	};

	aj.processHandle = function() {
		if(aj.XMLHttpRequest.readyState == 4 && aj.XMLHttpRequest.status == 200) {
			for(k in AJAX['url']) {
				if(AJAX['url'][k] == aj.targetUrl) {
					AJAX['url'][k] = null;
				}
			}
			if(aj.waitId) {
				// aj.waitId.style.display = 'none';
				$("#"+aj.waitId).fadeOut();
			}
			if(aj.recvType == 'HTML') {
				aj.resultHandle(aj.XMLHttpRequest.responseText, aj);
			} else if(aj.recvType == 'XML') {
				if(!aj.XMLHttpRequest.responseXML || !aj.XMLHttpRequest.responseXML.lastChild || aj.XMLHttpRequest.responseXML.lastChild.localName == 'parsererror') {
					aj.resultHandle('<a href="' + aj.targetUrl + '" target="_blank" style="color:red">XML解析错误</a>' , aj);
				} else {
					aj.resultHandle(aj.XMLHttpRequest.responseXML.lastChild.firstChild.nodeValue, aj);
				}
			}
			AJAX['stack'][aj.stackId] = 0;
		}
	};

	aj.get = function(targetUrl, resultHandle) {
		setTimeout(function(){aj.showLoading()}, 250);
		if(in_array(targetUrl, AJAX['url'])) {
			return false;
		} else {
			AJAX['url'].push(targetUrl);
		}
		aj.targetUrl = targetUrl;
		aj.XMLHttpRequest.onreadystatechange = aj.processHandle;
		aj.resultHandle = resultHandle;
		var attackevasive = isUndefined(attackevasive) ? 0 : attackevasive;
		var delay = attackevasive & 1 ? (aj.stackId + 1) * 1001 : 100;
		if(window.XMLHttpRequest) {
			setTimeout(function(){
			aj.XMLHttpRequest.open('GET', aj.targetUrl);
			aj.XMLHttpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			aj.XMLHttpRequest.send(null);}, delay);
		} else {
			setTimeout(function(){
			aj.XMLHttpRequest.open("GET", targetUrl, true);
			aj.XMLHttpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			aj.XMLHttpRequest.send();}, delay);
		}
	};
	aj.post = function(targetUrl, sendString, resultHandle) {
		setTimeout(function(){aj.showLoading()}, 250);
		if(in_array(targetUrl, AJAX['url'])) {
			return false;
		} else {
			AJAX['url'].push(targetUrl);
		}
		aj.targetUrl = targetUrl;
		aj.sendString = sendString;
		aj.XMLHttpRequest.onreadystatechange = aj.processHandle;
		aj.resultHandle = resultHandle;
		aj.XMLHttpRequest.open('POST', targetUrl);
		aj.XMLHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		aj.XMLHttpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		aj.XMLHttpRequest.send(aj.sendString);
	};
	return aj;
}

function newfunction(func){
	var args = [];
	for(var i=1; i<arguments.length; i++) args.push(arguments[i]);
	return function(event){
		doane(event);
		window[func].apply(window, args);
		return false;
	}
}

function evalscript(s) {
	if(s.indexOf('<script') == -1) return s;
	var p = /<script[^\>]*?>([^\x00]*?)<\/script>/ig;
	var arr = [];
	while(arr = p.exec(s)) {
		var p1 = /<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/i;
		var arr1 = [];
		arr1 = p1.exec(arr[0]);
		if(arr1) {
			appendscript(arr1[1], '', arr1[2], arr1[3]);
		} else {
			p1 = /<script(.*?)>([^\x00]+?)<\/script>/i;
			arr1 = p1.exec(arr[0]);
			appendscript('', arr1[2], arr1[1].indexOf('reload=') != -1);
		}
	}
	return s;
}

function appendscript(src, text, reload, charset) {
	var id = hash(src + text);
	var evalscripts = [];
	if(!reload && in_array(id, evalscripts)) return;
	if(reload && document.getElementById(id)) {
		document.getElementById(id).parentNode.removeChild(document.getElementById(id));
	}

	evalscripts.push(id);
	var scriptNode = document.createElement("script");
	scriptNode.type = "text/javascript";
	scriptNode.id = id;
	scriptNode.charset = charset ? charset : (BROWSER.firefox ? document.characterSet : document.charset);
	try {
		if(src) {
			scriptNode.src = src;
		} else if(text){
			scriptNode.text = text;
		}
		document.getElementById('append_parent').appendChild(scriptNode);
	} catch(e) {}
}

function stripscript(s) {
	return s.replace(/<script.*?>.*?<\/script>/ig, '');
}

function ajaxupdateevents(obj, tagName) {
	tagName = tagName ? tagName : 'A';
	var objs = obj.getElementsByTagName(tagName);
	for(k in objs) {
		var o = objs[k];
		ajaxupdateevent(o);
	}
}

function ajaxupdateevent(o) {
	if(typeof o == 'object' && o.getAttribute) {
		if(o.getAttribute('ajaxtarget')) {
			if(!o.id) o.id = Math.random();
			var ajaxevent = o.getAttribute('ajaxevent') ? o.getAttribute('ajaxevent') : 'click';
			var ajaxurl = o.getAttribute('ajaxurl') ? o.getAttribute('ajaxurl') : o.href;
			_attachEvent(o, ajaxevent, newfunction('ajaxget', ajaxurl, o.getAttribute('ajaxtarget'), o.getAttribute('ajaxwaitid'), o.getAttribute('ajaxloading'), o.getAttribute('ajaxdisplay')));
			if(o.getAttribute('ajaxfunc')) {
				o.getAttribute('ajaxfunc').match(/(\w+)\((.+?)\)/);
				_attachEvent(o, ajaxevent, newfunction(RegExp.document.getElementById1, RegExp.document.getElementById2));
			}
		}
	}
}

function ajaxget(url, showid, waitid, loading, display, recall) {
	
	waitid = typeof waitid == 'undefined' || waitid === null ? showid : waitid;
	var x = new Ajax();
	x.setLoading(loading);
	x.setWaitId(waitid);
	x.display = typeof display == 'undefined' || display == null ? '' : display;
	x.showId = document.getElementById(showid);
	if(x.showId) x.showId.orgdisplay = typeof x.showId.orgdisplay === 'undefined' ? x.showId.style.display : x.showId.orgdisplay;

	if(url.substr(strlen(url) - 1) == '#') {
		url = url.substr(0, strlen(url) - 1);
		x.autogoto = 1;
	}

	var url = url + '&inajax=1&ajaxtarget=' + showid;
	x.get(url, function(s, x) { 
		var evaled = false;
		
		if(s.indexOf('ajaxerror') != -1) {  
			evalscript(s);
			evaled = true;
		}
		
		if(!evaled && (typeof ajaxerror == 'undefined' || !ajaxerror)) {
			
			if(x.showId) {
				x.showId.style.display = x.showId.orgdisplay;
				x.showId.style.display = x.display;
				x.showId.orgdisplay = x.showId.style.display; 
				 
				ajaxinnerhtml(x.showId, s);
			
				ajaxupdateevents(x.showId,showid);
			
				if(x.autogoto) scroll(0, x.showId.offsetTop);
				
			}
		}

		ajaxerror = null;
		if(typeof recall == 'function') { 
		 
			recall(); 
		} else {
			
			eval(recall);
		}
		// if(!evaled) evalscript(s);
	});
}
function ajaxLogin(index){
	var is_remember = $("#log_remember").attr("checked"); 
	var log_name	 = $.trim($("#log_name").val());
	var log_pass = $.trim($("#log_password").val());
	if(is_remember ){ 
		var log_remember =1;
		}
	if(!log_name){
		$("#log_name").focus();
		$("#login_submit").addClass('animated shake').animate({border:0},1000,function(){$(this).removeClass('animated shake');});
		return false;
	}else if(!log_pass){
		$("#log_password").focus();
		$("#login_submit").addClass('animated shake').animate({border:0},1000,function(){$(this).removeClass('animated shake');});
		return false;
	}else{
		$.post("/index.php?do=login",{log_remember:log_remember,txt_account:log_name,pwd_password:log_pass,login_type:3},function(json){
			$("#load").addClass("hidden");
			$("#loading").removeClass("hidden");
			if(json.status){
				var balance =json.data.balance;
				var credit =json.data.credit;
				var username = json.data.username;
				var pic   = json.data.pic;
				var uid   = json.data.uid;
				var is_admin = json.data.is_admin;
				$("head").append(json.data.syn);
				loadHandle(index,json.msg,json.status,balance,credit,uid,username,pic,is_admin);
			}
		},'json')
	}
}
function loadHandle(index,desc,status,balance,credit,uid,username,pic,is_admin){
	$("#loading").addClass("hidden");
	$("#login_submit").removeClass("animated shake");
	if(status=="1"){// 成功
		if(!index||index=='index'){
		$("#load").removeClass("hidden");
		$("#logined").removeClass("hidden");
		$("#login").removeClass("selected");
		$("#login_box").addClass("hidden");
		$("#login_sub").addClass("hidden");
		is_admin==1?$("#manage_center").removeClass("hidden"):'';
		$("#avatar :first").attr("title",username).html(pic+username);
		$("#money").html("￥"+balance+"|"+credit);
		$("#space").attr("href","/index.php?do=space&member_id="+uid);
		}else{
			window.document.location.reload();
		}
	}else{// 错误
		$("#loading_error").removeClass("hidden").addClass("selected").html(desc);
		
		setTimeout("loginBoxShow()",1500);
	}
	
}
function loginBoxShow(){
	$("#loading_error").removeClass("selected").addClass("hidden");
	$("#load").removeClass("hidden");
}
function ajaxpost(formid, showid, waitid, showidclass, submitbtn, recall) {
	var waitid = typeof waitid == 'undefined' || waitid === null ? showid : (waitid !== '' ? waitid : '');
	var showidclass = !showidclass ? '' : showidclass;
	var ajaxframeid = 'ajaxframe';
	var ajaxframe = document.getElementById(ajaxframeid);
	var formtarget = document.getElementById(formid).target;

	var handleResult = function() {
		var s = '';
		var evaled = false;

		showloading('none');
		
		try {
			s = document.getElementById(ajaxframeid).contentWindow.document.XMLDocument.text;
		} catch(e) {
			try {
				s = document.getElementById(ajaxframeid).contentWindow.document.documentElement.firstChild.wholeText;
			} catch(e) {
				try {
					s = document.getElementById(ajaxframeid).contentWindow.document.documentElement.firstChild.nodeValue;
				} catch(e) {
					s = 'XML解析错误';
				}
			}
		}
		
       if (isUndefined(s)) {
	     s = 'server return empty , Plase check php script';
	   }

		if(s != '' && s.indexOf('ajaxerror') != -1) {
			evalscript(s);
			evaled = true;
		}
		if(showidclass) {
			document.getElementById(showid).className = showidclass;
		}
		if(submitbtn) {
			submitbtn.disabled = false;
		}
		if(!evaled && (typeof ajaxerror == 'undefined' || !ajaxerror)) {
			ajaxinnerhtml(document.getElementById(showid), s);
		}
		ajaxerror = null;
		if(document.getElementById(formid)) document.getElementById(formid).target = formtarget;
		if(typeof recall == 'function') {
			recall();
		} else {
			eval(recall);
		}
		if(!evaled) evalscript(s);
		ajaxframe.loading = 0;
		document.getElementById('append_parent').removeChild(ajaxframe.parentNode);
	};
	if(!ajaxframe) {
		/*
		 * if (BROWSER.ie) { if(BROWSER.ie=='9.0'){ ajaxframe =
		 * document.createElement("iframe"); ajaxframe.setAttribute("id",
		 * ajaxframeid); ajaxframe.setAttribute("name", ajaxframeid); }else{
		 * ajaxframe = document.createElement('<iframe name="' + ajaxframeid + '"
		 * id="' + ajaxframeid + '"></iframe>'); } } else { ajaxframe =
		 * document.createElement('iframe'); ajaxframe.name = ajaxframeid;
		 * ajaxframe.id = ajaxframeid; } ajaxframe.style.display = 'none';
		 * ajaxframe.loading = 1;
		 * document.getElementById('append_parent').appendChild(ajaxframe);
		 */

   	var div = document.createElement('div');
		div.style.display = 'none';
		div.innerHTML = '<iframe name="' + ajaxframeid + '" id="' + ajaxframeid + '" loading="1"></iframe>';
		document.getElementById('append_parent').appendChild(div);
		ajaxframe = document.getElementById(ajaxframeid);
	} else if(ajaxframe.loading) {
		return false;
	}

	_attachEvent(ajaxframe, 'load', handleResult);

	showloading();
	document.getElementById(formid).target = ajaxframeid;
	document.getElementById(formid).action += '&inajax=1';
	document.getElementById(formid).submit();
	if(submitbtn) {
		submitbtn.disabled = true;
	}
	doane();
	return false;
}

function ajaxmenu(ctrlObj, timeout, cache, duration, pos, recall) {
	var ctrlid = ctrlObj.id;
	if(!ctrlid) {
		ctrlid = ctrlObj.id = 'ajaxid_' + Math.random();
	}
	var menuid = ctrlid + '_menu';
	var menu = document.getElementById(menuid);
	if(isUndefined(timeout)) timeout = 3000;
	if(isUndefined(cache)) cache = 1;
	if(isUndefined(pos)) pos = '43';
	if(isUndefined(duration)) duration = timeout > 0 ? 0 : 3; 
	var func = function() {
		showMenu({'ctrlid':ctrlid,'duration':duration,'timeout':timeout,'pos':pos,'cache':cache,'layer':2});
		if(typeof recall == 'function') {
			recall();
		} else {
			eval(recall);
		}
	};

	if(menu) {
		if(menu.style.display == '') {
			hideMenu(menuid);
		} else {
			func();
		}
	} else {
		menu = document.createElement('div');
		menu.id = menuid;
		menu.style.display = 'none';
		menu.className = 'p_pop';
		menu.innerHTML = '<div class="p_opt" id="' + menuid + '_content"></div>';
		document.getElementById('append_parent').appendChild(menu);
		var url = (!isUndefined(ctrlObj.href) ? ctrlObj.href : ctrlObj.attributes['href'].value) + '&ajaxmenu=1';
		ajaxget(url, menuid + '_content', 'ajaxwaitid', '', '', func);
	}
	doane();
}

function hash(string, length) {
	var length = length ? length : 32;
	var start = 0;
	var i = 0;
	var result = '';
	filllen = length - string.length % length;
	for(i = 0; i < filllen; i++){
		string += "0";
	}
	while(start < string.length) {
		result = stringxor(result, string.substr(start, length));
		start += length;
	}
	return result;
}

function stringxor(s1, s2) {
	var s = '';
	var hash = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var max = Math.max(s1.length, s2.length);
	for(var i=0; i<max; i++) {
		var k = s1.charCodeAt(i) ^ s2.charCodeAt(i);
		s += hash.charAt(k % 52);
	}
	return s;
}

function showloading(display, waiting) {
	// var display = display ? display : '';
	// var waiting = waiting ? waiting : 'loading...';
	// document.getElementById('ajaxwaitid').innerHTML = waiting;
	// document.getElementById('ajaxwaitid').style.display = display;
	$("#ajaxwaitid").fadeIn();
}

function ajaxinnerhtml(showid, s) {
	 
	if(showid.tagName != 'TBODY') {
		// showid.innerHTML = s;
		$(showid).html(s);
	} else {
		while(showid.firstChild) {
			showid.firstChild.parentNode.removeChild(showid.firstChild);
		}
		var div1 = document.createElement('DIV');
		div1.id = showid.id+'_div';
		div1.innerHTML = '<table><tbody id="'+showid.id+'_tbody">'+s+'</tbody></table>';
		document.getElementById('append_parent').appendChild(div1);
		var trs = div1.getElementsByTagName('TR');
		var l = trs.length;
		for(var i=0; i<l; i++) {
			showid.appendChild(trs[0]);
		}
		var inputs = div1.getElementsByTagName('INPUT');
		var l = inputs.length;
		for(var i=0; i<l; i++) {
			showid.appendChild(inputs[0]);
		}
		div1.parentNode.removeChild(div1);
	}
}

 
 
function simulateSelect(selectId, widthvalue) {
	var selectObj = document.getElementById(selectId);
	if(!selectObj) return;
	var widthvalue = widthvalue ? widthvalue : 70;
	var defaultopt = selectObj.options[0] ? selectObj.options[0].innerHTML : '';
	var defaultv = '';
	var menuObj = document.createElement('div');
	var ul = document.createElement('ul');
	var handleKeyDown = function(e) {
		e = BROWSER.ie ? event : e;
		if(e.keyCode == 40 || e.keyCode == 38) doane(e);
	};
	var selectwidth = (selectObj.getAttribute('width', i) ? selectObj.getAttribute('width', i) : widthvalue) + 'px';

	for(var i = 0; i < selectObj.options.length; i++) {
		var li = document.createElement('li');
		li.innerHTML = selectObj.options[i].innerHTML;
		li.k_id = i;
		li.k_value = selectObj.options[i].value;
		if(selectObj.options[i].selected) {
			defaultopt = selectObj.options[i].innerHTML;
			defaultv = selectObj.options[i].value;
			li.className = 'current';
			selectObj.setAttribute('selecti', i);
		}
		li.onclick = function() {
			if(document.getElementById(selectId + '_ctrl').innerHTML != this.innerHTML) {
				var lis = menuObj.getElementsByTagName('li');
				lis[document.getElementById(selectId).getAttribute('selecti')].className = '';
				this.className = 'current';
				document.getElementById(selectId + '_ctrl').innerHTML = this.innerHTML;
				document.getElementById(selectId).setAttribute('selecti', this.k_id);
				document.getElementById(selectId).options.length = 0;
				document.getElementById(selectId).options[0] = new Option('', this.k_value);
				eval(selectObj.getAttribute('change'));
			}
			hideMenu(menuObj.id);
			return false;
		};
		ul.appendChild(li);
	}

	selectObj.options.length = 0;
	selectObj.options[0]= new Option('', defaultv);
	selectObj.style.display = 'none';
	selectObj.outerHTML += '<a href="javascript:;" hidefocus="true" id="' + selectId + '_ctrl" style="width:' + selectwidth + '" tabindex="1">' + defaultopt + '</a>';

	menuObj.id = selectId + '_ctrl_menu';
	menuObj.className = 'sltm';
	menuObj.style.display = 'none';
	menuObj.style.width = selectwidth;
	menuObj.appendChild(ul);
	document.getElementById('append_parent').appendChild(menuObj);

	document.getElementById(selectId + '_ctrl').onclick = function(e) {
		document.getElementById(selectId + '_ctrl_menu').style.width = selectwidth;
		showMenu({'ctrlid':(selectId == 'loginfield' ? 'account' : selectId + '_ctrl'),'menuid':selectId + '_ctrl_menu','evt':'click','pos':'13'});
		doane(e);
	};
	document.getElementById(selectId + '_ctrl').onfocus = menuObj.onfocus = function() {
		_attachEvent(document.body, 'keydown', handleKeyDown);
	};
	document.getElementById(selectId + '_ctrl').onblur = menuObj.onblur = function() {
		_detachEvent(document.body, 'keydown', handleKeyDown);
	};
	document.getElementById(selectId + '_ctrl').onkeyup = function(e) {
		e = e ? e : window.event;
		value = e.keyCode;
		if(value == 40 || value == 38) {
			if(menuObj.style.display == 'none') {
				document.getElementById(selectId + '_ctrl').onclick();
			} else {
				lis = menuObj.getElementsByTagName('li');
				selecti = selectObj.getAttribute('selecti');
				lis[selecti].className = '';
				if(value == 40) {
					selecti = parseInt(selecti) + 1;
				} else if(value == 38) {
					selecti = parseInt(selecti) - 1;
				}
				if(selecti < 0) {
					selecti = lis.length - 1
				} else if(selecti > lis.length - 1) {
					selecti = 0;
				}
				lis[selecti].className = 'current';
				selectObj.setAttribute('selecti', selecti);
				lis[selecti].parentNode.scrollTop = lis[selecti].offsetTop;
			}
		} else if(value == 13) {
			var lis = menuObj.getElementsByTagName('li');
			lis[selectObj.getAttribute('selecti')].onclick();
		} else if(value == 27) {
			hideMenu(menuObj.id);
		}
	};
}

function detectCapsLock(e, obj) {
	var valueCapsLock = e.keyCode ? e.keyCode : e.which;
	var valueShift = e.shiftKey ? e.shiftKey : (valueCapsLock == 16 ? true : false);
	this.clearDetect = function () {
		obj.className = 'txt';
	};

	obj.className = (valueCapsLock >= 65 && valueCapsLock <= 90 && !valueShift || valueCapsLock >= 97 && valueCapsLock <= 122 && valueShift) ? 'clck txt' : 'txt';

	if(BROWSER.ie) {
		event.srcElement.onblur = this.clearDetect;
	} else {
		e.target.onblur = this.clearDetect;
	}
}

 

function showselect(obj, inpid, t, rettype) {
	if(!obj.id) {
		var t = !t ? 0 : t;
		var rettype = !rettype ? 0 : rettype;
		obj.id = 'calendarexp_' + Math.random();
		div = document.createElement('div');
		div.id = obj.id + '_menu';
		div.style.display = 'none';
		div.className = 'p_pop';
		document.getElementById('append_parent').appendChild(div);
		s = '';
		if(!t) {
			s += showselect_row(inpid, '一天', 1, 0, rettype);
			s += showselect_row(inpid, '一周', 7, 0, rettype);
			s += showselect_row(inpid, '一个月', 30, 0, rettype);
			s += showselect_row(inpid, '三个月', 90, 0, rettype);
			s += showselect_row(inpid, '自定义', -2);
		} else {
			if(document.getElementById(t)) {
				var lis = document.getElementById(t).getElementsByTagName('LI');
				for(i = 0;i < lis.length;i++) {
					s += '<a href="javascript:;" onclick="document.getElementById(\'' + inpid + '\').value = this.innerHTML">' + lis[i].innerHTML + '</a>';
				}
				s += showselect_row(inpid, '自定义', -1);
			} else {
				s += '<a href="javascript:;" onclick="document.getElementById(\'' + inpid + '\').value = \'0\'">永久</a>';
				s += showselect_row(inpid, '7 天', 7, 1, rettype);
				s += showselect_row(inpid, '14 天', 14, 1, rettype);
				s += showselect_row(inpid, '一个月', 30, 1, rettype);
				s += showselect_row(inpid, '三个月', 90, 1, rettype);
				s += showselect_row(inpid, '半年', 182, 1, rettype);
				s += showselect_row(inpid, '一年', 365, 1, rettype);
				s += showselect_row(inpid, '自定义', -1);
			}
		}
		document.getElementById(div.id).innerHTML = s;
	}
	showMenu({'ctrlid':obj.id,'evt':'click'});
	if(BROWSER.ie && BROWSER.ie < 7) {
		doane(event);
	}
}



function showColorBox(ctrlid, layer, k) {
	if(!document.getElementById(ctrlid + '_menu')) {
		var menu = document.createElement('div');
		menu.id = ctrlid + '_menu';
		menu.className = 'p_pop colorbox';
		menu.unselectable = true;
		menu.style.display = 'none';
		var coloroptions = ['Black', 'Sienna', 'DarkOliveGreen', 'DarkGreen', 'DarkSlateBlue', 'Navy', 'Indigo', 'DarkSlateGray', 'DarkRed', 'DarkOrange', 'Olive', 'Green', 'Teal', 'Blue', 'SlateGray', 'DimGray', 'Red', 'SandyBrown', 'YellowGreen', 'SeaGreen', 'MediumTurquoise', 'RoyalBlue', 'Purple', 'Gray', 'Magenta', 'Orange', 'Yellow', 'Lime', 'Cyan', 'DeepSkyBlue', 'DarkOrchid', 'Silver', 'Pink', 'Wheat', 'LemonChiffon', 'PaleGreen', 'PaleTurquoise', 'LightBlue', 'Plum', 'White'];
		var colortexts = ['黑色', '赭色', '暗橄榄绿色', '暗绿色', '暗灰蓝色', '海军色', '靛青色', '墨绿色', '暗红色', '暗桔黄色', '橄榄色', '绿色', '水鸭色', '蓝色', '灰石色', '暗灰色', '红色', '沙褐色', '黄绿色', '海绿色', '间绿宝石', '皇家蓝', '紫色', '灰色', '红紫色', '橙色', '黄色', '酸橙色', '青色', '深天蓝色', '暗紫色', '银色', '粉色', '浅黄色', '柠檬绸色', '苍绿色', '苍宝石绿', '亮蓝色', '洋李色', '白色'];
		var str = '';
		for(var i = 0; i < 40; i++) {
			str += '<input type="button" style="background-color: ' + coloroptions[i] + '"' + (typeof setEditorTip == 'function' ? ' onmouseover="setEditorTip(\'' + colortexts[i] + '\')" onmouseout="setEditorTip(\'\')"' : '') + ' onclick="'
			+ (typeof wysiwyg == 'undefined' ? 'seditor_insertunit(\'' + k + '\', \'[color=' + coloroptions[i] + ']\', \'[/color]\')' : (ctrlid == editorid + '_tbl_param_4' ? 'document.getElementById(\'' + ctrlid + '\').value=\'' + coloroptions[i] + '\';hideMenu(2)' : 'KEKECODE(\'forecolor\', \'' + coloroptions[i] + '\')'))
			+ '" title="' + colortexts[i] + '" />' + (i < 39 && (i + 1) % 8 == 0 ? '<br />' : '');
		}
		menu.innerHTML = str;
		document.getElementById('append_parent').appendChild(menu);
	}
	showMenu({'ctrlid':ctrlid,'evt':'click','layer':layer});
}



function seditor_ctlent(event, script) {
	if(event.ctrlKey && event.keyCode == 13 || event.altKey && event.keyCode == 83) {
		eval(script);
	}
}
 
function parseurl(str, mode, parsecode) {
	if(isUndefined(parsecode)) parsecode = true;
	if(parsecode) str= str.replace(/\s*\[code\]([\s\S]+?)\[\/code\]\s*/ig, function($1, $2) {return codetag($2);});
	str = str.replace(/([^>=\]"'\/]|^)((((https?|ftp):\/\/)|www\.)([\w\-]+\.)*[\w\-\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&~`@':+!]*)+\.(jpg|gif|png|bmp))/ig, mode == 'html' ? '$1<img src="$2" border="0">' : '$1[img]$2[/img]');
	str = str.replace(/([^>=\]"'\/@]|^)((((https?|ftp|gopher|news|telnet|rtsp|mms|callto|bctp|ed2k|thunder|synacast):\/\/))([\w\-]+\.)*[:\.@\-\w\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&~`@':+!#]*)*)/ig, mode == 'html' ? '$1<a href="$2" target="_blank">$2</a>' : '$1[url]$2[/url]');
	str = str.replace(/([^\w>=\]"'\/@]|^)((www\.)([\w\-]+\.)*[:\.@\-\w\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&~`@':+!#]*)*)/ig, mode == 'html' ? '$1<a href="$2" target="_blank">$2</a>' : '$1[url]$2[/url]');
	str = str.replace(/([^\w->=\]:"'\.\/]|^)(([\-\.\w]+@[\.\-\w]+(\.\w+)+))/ig, mode == 'html' ? '$1<a href="mailto:$2">$2</a>' : '$1[email]$2[/email]');
	if(parsecode) {
		for(var i = 0; i <= KEKECODE['num']; i++) {
			str = str.replace("[\tCODE_" + i + "\t]", KEKECODE['html'][i]);
		}
	}
	return str;
}

function codetag(text) {
	KEKECODE['num']++;
	if(typeof wysiwyg != 'undefined' && wysiwyg) text = text.replace(/<br[^\>]*>/ig, '\n').replace(/<(\/|)[A-Za-z].*?>/ig, '');
	KEKECODE['html'][KEKECODE['num']] = '[code]' + text + '[/code]';
	return '[\tCODE_' + KEKECODE['num'] + '\t]';
}



if(BROWSER.ie) {
	document.documentElement.addBehavior("#default#userdata");
}



function ctrlEnter(event, btnId, onlyEnter) {
	if(isUndefined(onlyEnter)) onlyEnter = 0;
	if((event.ctrlKey || onlyEnter) && event.keyCode == 13) {
		document.getElementById(btnId).click();
		return false;
	}
	return true;
}

function hasClass(elem, className) {
	return elem.className && (" " + elem.className + " ").indexOf(" " + className + " ") != -1;
}


 
function updatestring(str1, str2, clear) {
	str2 = '_' + str2 + '_';
	return clear ? str1.replace(str2, '') : (str1.indexOf(str2) == -1 ? str1 + str2 : str1);
}

function parsepmcode(theform) {
	theform.message.value = parseurl(theform.message.value);
}




function getClipboardData() {
	window.document.clipboardswf.SetVariable('str', clipboardswfdata);
}
function AC_GetArgs(args, classid, mimeType) {
	var ret = new Object();
	ret.embedAttrs = new Object();
	ret.params = new Object();
	ret.objAttrs = new Object();
	for (var i = 0; i < args.length; i = i + 2){
		var currArg = args[i].toLowerCase();
		switch (currArg){
			case "classid":break;
			case "pluginspage":ret.embedAttrs[args[i]] = 'http://www.macromedia.com/go/getflashplayer';break;
			case "src":ret.embedAttrs[args[i]] = args[i+1];ret.params["movie"] = args[i+1];break;
			case "codebase":ret.objAttrs[args[i]] = 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0';break;
			case "onafterupdate":case "onbeforeupdate":case "onblur":case "oncellchange":case "onclick":case "ondblclick":case "ondrag":case "ondragend":
			case "ondragenter":case "ondragleave":case "ondragover":case "ondrop":case "onfinish":case "onfocus":case "onhelp":case "onmousedown":
			case "onmouseup":case "onmouseover":case "onmousemove":case "onmouseout":case "onkeypress":case "onkeydown":case "onkeyup":case "onload":
			case "onlosecapture":case "onpropertychange":case "onreadystatechange":case "onrowsdelete":case "onrowenter":case "onrowexit":case "onrowsinserted":case "onstart":
			case "onscroll":case "onbeforeeditfocus":case "onactivate":case "onbeforedeactivate":case "ondeactivate":case "type":
			case "id":ret.objAttrs[args[i]] = args[i+1];break;
			case "width":case "height":case "align":case "vspace": case "hspace":case "class":case "title":case "accesskey":case "name":
			case "tabindex":ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];break;
			default:ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
		}
	}
	ret.objAttrs["classid"] = classid;
	if(mimeType) {
		ret.embedAttrs["type"] = mimeType;
	}
	return ret;
}

function AC_DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision) {
	var versionStr = -1;
	if(navigator.plugins != null && navigator.plugins.length > 0 && (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"])) {
		var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
		var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
		var descArray = flashDescription.split(" ");
		var tempArrayMajor = descArray[2].split(".");
		var versionMajor = tempArrayMajor[0];
		var versionMinor = tempArrayMajor[1];
		var versionRevision = descArray[3];
		if(versionRevision == "") {
			versionRevision = descArray[4];
		}
		if(versionRevision[0] == "d") {
			versionRevision = versionRevision.substring(1);
		} else if(versionRevision[0] == "r") {
			versionRevision = versionRevision.substring(1);
			if(versionRevision.indexOf("d") > 0) {
				versionRevision = versionRevision.substring(0, versionRevision.indexOf("d"));
			}
		}
		versionStr = versionMajor + "." + versionMinor + "." + versionRevision;
	} else if(BROWSER.ie && !BROWSER.opera) {
		try {
			var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
			versionStr = axo.GetVariable("$version");
		} catch (e) {}
	}
	if(versionStr == -1 ) {
		return false;
	} else if(versionStr != 0) {
		if(BROWSER.ie && !BROWSER.opera) {
			tempArray = versionStr.split(" ");
			tempString = tempArray[1];
			versionArray = tempString.split(",");
		} else {
			versionArray = versionStr.split(".");
		}
		var versionMajor = versionArray[0];
		var versionMinor = versionArray[1];
		var versionRevision = versionArray[2];
		return versionMajor > parseFloat(reqMajorVer) || (versionMajor == parseFloat(reqMajorVer)) && (versionMinor > parseFloat(reqMinorVer) || versionMinor == parseFloat(reqMinorVer) && versionRevision >= parseFloat(reqRevision));
	}
}

function AC_FL_RunContent() {
	var str = '';
	if(AC_DetectFlashVer(9,0,124)) {
		var ret = AC_GetArgs(arguments, "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000", "application/x-shockwave-flash");
		if(BROWSER.ie && !BROWSER.opera) {
			str += '<object ';
			for (var i in ret.objAttrs) {
				str += i + '="' + ret.objAttrs[i] + '" ';
			}
			str += '>';
			for (var i in ret.params) {
				str += '<param name="' + i + '" value="' + ret.params[i] + '" /> ';
			}
			str += '</object>';
		} else {
			str += '<embed ';
			for (var i in ret.embedAttrs) {
				str += i + '="' + ret.embedAttrs[i] + '" ';
			}
			str += '></embed>';
		}
	} else {
		str = '此内容需要 Adobe Flash Player 9.0.124 或更高版本<br /><a href="http://www.adobe.com/go/getflashplayer/" target="_blank"><img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="下载 Flash Player" /></a>';
	}
	return str;
}
function setCopy(text, msg,type){
	if(BROWSER.ie) {
		clipboardData.setData('Text', text);
		if(msg) {
			showDialog(msg, 'notice');
		}
	} else {
		var flash  = 'resource/img/keke/clipboard.swf';
			type=='admin'?flash='../../'+flash:'';
		var msg = '<div class="c"><div style="width: 200px; text-align: center; text-decoration:underline;">点此复制到剪贴板</div>' +
		AC_FL_RunContent('id', 'clipboardswf', 'name', 'clipboardswf', 'devicefont', 'false', 'width', '200', 'height', '40', 'src',  flash, 'menu', 'false',  'allowScriptAccess', 'sameDomain', 'swLiveConnect', 'true', 'wmode', 'transparent', 'style' , 'margin-top:-20px') + '</div>';
		showDialog(msg, 'info');
		text = text.replace(/[\xA0]/g, ' ');
		clipboardswfdata = text;
	}
}
    function getscore(){
        var x = new Ajax();
        x.get('/index.php?do=ajax_score&op=getscore', function(s){
            if (s) {
				msgwin(s, 2000);
            }
        });
		  
    }
    
    function msgwin(s, t){
       
        var msgWinObj = document.getElementById('msgwin');
        if (!msgWinObj) {
            var msgWinObj = document.createElement("div");
            msgWinObj.id = 'msgwin';
            msgWinObj.style.display = 'none';
            msgWinObj.style.position = 'absolute';
            msgWinObj.style.zIndex = '100000';
            document.getElementById('append_parent').appendChild(msgWinObj);
        }
        msgWinObj.innerHTML = s;
        msgWinObj.style.display = '';
        msgWinObj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=0)';
        msgWinObj.style.opacity = 0;
        var sTop = document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
        pbegin = sTop + (document.documentElement.clientHeight / 2);
        pend = sTop + (document.documentElement.clientHeight / 5);
        setTimeout(function(){
            showmsgwin(pbegin, pend, 0, t)
        }, 10);
        msgWinObj.style.left = ((document.documentElement.clientWidth - msgWinObj.clientWidth) / 2) + 'px';
        msgWinObj.style.top = pbegin + 'px';
    }
    
    function showmsgwin(b, e, a, t){
        step = (b - e) / 10;
        var msgWinObj = document.getElementById('msgwin');
        newp = (parseInt(msgWinObj.style.top) - step);
        if (newp > e) {
            msgWinObj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + a + ')';
            msgWinObj.style.opacity = a / 100;
            msgWinObj.style.top = newp + 'px';
            setTimeout(function(){
                showmsgwin(b, e, a += 10, t)
            }, 10);
        }
        else {
            msgWinObj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=100)';
            msgWinObj.style.opacity = 1;
            setTimeout('displayOpacity(\'msgwin\', 100)', t);
        }
    }
    
    function displayOpacity(id, n){
        if (!document.getElementById(id)) {
            return;
        }
        if (n >= 0) {
            n -= 10;
            document.getElementById(id).style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + n + ')';
            document.getElementById(id).style.opacity = n / 100;
            setTimeout('displayOpacity(\'' + id + '\',' + n + ')', 50);
        }
        else {
            document.getElementById(id).style.display = 'none';
            document.getElementById(id).style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=100)';
            document.getElementById(id).style.opacity = 1;
        }
    }
    
    function display(id){
        var obj = document.getElementById(id);
        obj.style.display = obj.style.display == '' ? 'none' : '';
    }
    function showPrompt(ctrlid, evt, msg, timeout) {
    	var menuid = ctrlid ? ctrlid + '_pmenu' : 'ntcwin';
    	var duration = timeout ? 0 : 3;
    	if($(menuid)) {
    		$(menuid).parentNode.removeChild($(menuid));
    	}
    	var div = document.createElement('div');
    	div.id = menuid;
    	div.className = ctrlid ? 'prmm up' : 'ntcwin';
    	div.style.display = 'none';
    	$('append_parent').appendChild(div);
    	if(ctrlid) {
    		msg = '<div id="' + ctrlid + '_prompt" class="prmc"><ul><li>' + msg + '</li></ul></div>';
    	} else {
    		msg = '<table cellspacing="0" cellpadding="0" class="popupcredit"><tr><td class="pc_l">&nbsp;</td><td class="pc_c"><div class="pc_inner">' + msg +
    			'</td><td class="pc_r">&nbsp;</td></tr></table>';
    	}
    	div.innerHTML = msg;
    	if(ctrlid) {
    		if($(ctrlid).evt !== false) {
    			var prompting = function() {
    				showMenu({'mtype':'prompt','ctrlid':ctrlid,'evt':evt,'menuid':menuid,'pos':'210'});
    			};
    			if(evt == 'click') {
    				$(ctrlid).onclick = prompting;
    			} else {
    				$(ctrlid).onmouseover = prompting;
    			}
    		}
    		showMenu({'mtype':'prompt','ctrlid':ctrlid,'evt':evt,'menuid':menuid,'pos':'210','duration':duration,'timeout':timeout,'fade':1,'zindex':JSMENU['zIndex']['prompt']});
    		$(ctrlid).unselectable = false;
    	}else {
    		showMenu({'mtype':'prompt','pos':'00','menuid':menuid,'duration':duration,'timeout':timeout,'fade':1,'zindex':JSMENU['zIndex']['prompt']});
    	}
    }
    
/**
 * 
 * @param name
 *            公有名称
 * @param cls_show
 *            class 显示样式名称
 * @param cls_hide
 *            hide 样式名称
 * @param cnt
 *            tab的数个数
 * @param cur
 *            当前的个数
 * @param exp
 *            扩展。对象
 * @return
 */
function swaptab(name, cls_show, cls_hide, cnt, cur,exp) {
	var mpre='tab_',spre='div_',mzone={},szone={};
	typeof(exp)=='object'?'':exp={};
	exp.mpre?mpre=exp.mpre:'';
	exp.spre?spre=exp.spre:'';
	for (i = 1; i <= cnt; i++) {
		szone = $('#'+spre + name + '_' + i);
		mzone = $('#'+mpre + name + '_' + i);
		if (i == cur) {
			szone.removeClass('hidden').addClass('block');
			mzone.attr('class', cls_show);
			(exp.ajax==1&&exp.url)&&ajaxTab(spre + name + '_' + i,exp.data,exp.url);
		} else {
			szone.removeClass('block').addClass('hidden');
			mzone.attr('class', cls_hide);
		}
	}
}
/**
 * 
 * @param tid
 *            待载入内容的容器Id
 * @param data
 *            待传递参数
 * @param url
 *            待请求链接
 */
function ajaxTab(tid,data,url){
	var zone  = $('#'+tid);
	var zinfo = $.trim(zone.html());
	if(zinfo==''||zinfo=='Data failed to load'){
		$.ajax({
			url:url,
			data:data,
			dataType:'text',
			success:function(data){
				zone.html(data);
			},
			error:function(){
				zone.html('Data failed to load');
				return false;
			}
		})
	}
}

var noflushwarper = document.getElementById('noflushwarper');
function page_load_get(url,delay_time){
	page_ajax_load_start();
	$.get(url,{ajaxflush:1},function(data){
		$('#wrapper').html(data);
		delay_time = parseInt(delay_time);
		if(!isNaN(delay_time)){
			settimeout("page_ajax_load_end();",delay_time*1000);
		}
		else{
			page_ajax_load_end();
		}
	});
	return false;
}
function page_load_post(url,delay_time){
	page_ajax_load_start();
	$.post(url,{ajaxflush:1},function(data){
		$('#keke_content_body').html(data);
		delay_time = parseInt(delay_time);
		if(!isNaN(delay_time)){
			settimeout("page_ajax_load_end();",delay_time*1000);
		}
		else{
			page_ajax_load_end();
		}
	});
	return false;
}
function page_load_form(formid,delay_time){
	page_ajax_load_start();
	var queryString = $("#"+formid).formSerialize();
	var url = $("#"+formid).attr('action');
	if(url.match(/\?/)){url+='&ajaxflush=1';}else{url+='?ajaxflush=1';}
	$.post(url, queryString, function(data){
		$('#keke_content_body').html(data);
		delay_time = parseInt(delay_time);
		if(!isNaN(delay_time)){
			settimeout("page_ajax_load_end();",delay_time*1000);
		}
		else{
			page_ajax_load_end();
		}
    });
	return false;
}
function page_ajax_load_start(){
	document.body.scrollHeight

	noflushwarper.style.width = document.body.scrollWidth;
	noflushwarper.style.height = document.body.scrollHeight;
	$(noflushwarper).show();

}
function page_ajax_load_end(){
	$(noflushwarper).hide();
}
//控制交稿部分的高度
function putconHtext () {
	$(".putcontext").each(function(){
		$(this).find("img").not(".hideimg").remove();
		var pHeight=$(this).height();
		var aHeight=$(this).parent(".putcontent").siblings(".authright").height();
		var imgHeight=$(this).siblings(".putimgbox").height();
		var cHeight=aHeight-imgHeight-80;
		if (pHeight<cHeight){
			$(this).css("height",cHeight+"px");
		}
		if ($(this).find("img.hideimg").length>0){
			$(this).css("height",cHeight+40+"px");
		}
	});	
}
function tksconTc () {
	$(".tkscontc").each(function(){
		var pHeight=$(this).height();
		var aHeight=$(this).parent(".putcontent").siblings(".authright").height()
		var imgHeight=$(this).siblings(".putimgbox").height();
		var cHeight=aHeight-imgHeight-135;
		if (pHeight<cHeight){
			$(this).siblings(".putimgbox").css("height",cHeight+"px");
		}
		if ($(this).find("img.hideimg").length>0){
			$(this).css("height",cHeight+40+"px");
		}
	});
}
function tksconTx () {
	$(".tkscontx").each(function(){
		var pHeight=$(this).height();
		var aHeight=$(this).parent(".putcontent").siblings(".authright").height()
		var tksHeight=$(this).siblings(".tkscontx").height();
		var cHeight=aHeight-tksHeight-135;
		if (pHeight<cHeight){
			$(this).css("height",cHeight+"px");
		}
		if ($(this).find("img.hideimg").length>0){
			$(this).css("height",cHeight+40+"px");
		}
	});
}
/**
 * ajax分页 向指定容器中异步加载分页数据。
 * 
 * @param ajaxDom
 *            需要加载内容的容器ID
 * @param loadUrl
 *            数据请求链接
 * @param loadPage
 *            加载页面
 */
function ajaxpage(ajaxDom,loadUrl,loadPage){
	var showDom = $("#"+ajaxDom);
	var pageDom = $("#page"+loadPage);
	var oldDom = showDom.clone(true).hide();
	if(pageDom.length==0&&loadPage>1){
		showDom.load(loadUrl+'&inajax=1 #'+ajaxDom+'>*', function() {
			showDom.before(oldDom);
			showDom.show();
			showDom.siblings().hide();
			showDom.attr("id","page"+loadPage);
			if ($(".authortool")){
				putconHtext ();
				tksconTc ();
				tksconTx ();
				$(".closplun").trigger('click');
				$("html,body").animate({scrollTop: $("#page"+loadPage).offset().top-130});
			}
			
		});
	}else{
		if(loadPage==1){
			showDom.show().siblings().hide();
			$("#task_info").show();
			$("#nav_lists_nav").show();
			$("#task_comment").show();
			if ($("#gj_summery").length){
				$("html,body").animate({scrollTop: $("#gj_summery").offset().top-130});
			}
		}else{
			pageDom.show().siblings().hide();
			if ( $("#page"+loadPage).length){
				$("html,body").animate({scrollTop: $("#page"+loadPage).offset().top-130});
			}
		}
	}
}
/**
 * 分页输入页数跳转
 * @param txtDom 输入框的id值
 * @param loadUrl 数据请求链接
 * @param maxPage 最大页数
 */
function gotopage(obj,loadUrl,maxPage,ajaxDom,anchor,s_static){
	var txtVal = 0;
	var txtDom = $(obj).prev();

	txtVal = txtDom.val() ? parseInt(txtDom.val()) : 0;
	if(txtVal <= 0){
		txtVal = 1;
		txtDom.val(txtVal);
	}
	if(txtVal >= maxPage){
		txtVal = maxPage;
	}
	txtDom.val(txtVal);
	var last_char = loadUrl[loadUrl.length-1];
	var sp = (loadUrl.indexOf('?') >= 0) ? (last_char == '&' ? '' : '&') : (last_char == '?' ? '' : '?');
	var url = '';
	if(s_static){
		if(loadUrl.indexOf('page') >= 0){
			if(loadUrl.indexOf('-') >=0 ){
				var regx = /page\-(\d+)/gi;
				url = loadUrl.replace(regx,"page-"+txtVal);
			}else{
			    var regx = /page(\d+)/gi;
				url = loadUrl.replace(regx,"page"+txtVal);
			}
		}else{
			url = loadUrl + sp + 'page' + txtVal;
		}
	}else{
		url = loadUrl + sp + 'page=' + txtVal;
	}
	if(ajaxDom){
		ajaxpage(ajaxDom,url+anchor,txtVal);
	}else{
		window.location.href=url;
	}
}
function getJson(url,jump){
	$.getJSON(url,function(json){
		var tp = json.status==1?'right':'alert';
		showDialog(json.data,tp,json.msg,function(){
			jump?location.href=jump:'';
		});return false;
	});
}
function d_time(end_time){
    var DifferenceHour = -1
    var DifferenceMinute = -1
    var DifferenceSecond = -1
    var Tday = new Date(end_time * 1000) // **倒计时时间点-注意格式
    var daysms = 24 * 60 * 60 * 1000
    var hoursms = 60 * 60 * 1000
    var Secondms = 60 * 1000
    var microsecond = 1000
    var d_arr = new Array();
    
    var time = new Date()
    var hour = time.getHours()
    var minute = time.getMinutes()
    var second = time.getSeconds()
	
    var timevalue = "" + ((hour > 12) ? hour - 12 : hour)
    timevalue += ((minute < 10) ? ":0" : ":") + minute
    timevalue += ((second < 10) ? ":0" : ":") + second
		
    timevalue += ((hour > 12) ? " PM" : " AM")
    var convertHour = DifferenceHour
    var convertMinute = DifferenceMinute
    var convertSecond = DifferenceSecond
    var Diffms = Tday.getTime() - time.getTime()
    DifferenceHour = Math.floor(Diffms / daysms)
    Diffms -= DifferenceHour * daysms
    DifferenceMinute = Math.floor(Diffms / hoursms)
    Diffms -= DifferenceMinute * hoursms
    DifferenceSecond = Math.floor(Diffms / Secondms)

    Diffms -= DifferenceSecond * Secondms
    var dSecs = Math.floor(Diffms / microsecond)
	if (convertHour != DifferenceHour) {
	    d_arr.push(DifferenceHour);
	}else{
		d_arr.push(0);
	}
    if (convertMinute != DifferenceMinute){
		d_arr.push(DifferenceMinute);
	} else{
		d_arr.push(0);
	}   
    if (convertSecond != DifferenceSecond) 
         d_arr.push(DifferenceSecond);
     
    d_arr.push(dSecs); 
 
    return d_arr;
    
}

window.onload = function(){ 
    
  /*
	 * $("body").ajaxStart(function(){ $("#ajaxwaitid").fadeIn();
	 * }).ajaxComplete(function(){ $("#ajaxwaitid").fadeOut(); })
	 */
	 
 
}
function download(url){
	return encodeURI(url);
}


function CopyTxt(obj_id) { 
	var arg_str_text = document.getElementById(obj_id).value;
	if(arg_str_text==""){
		return;
	}

   // obj_input.select();
  if(window.clipboardData) {        
		window.clipboardData.clearData();        
		window.clipboardData.setData("Text", arg_str_text);
		
		showDialog("内容已经复制到剪贴板！","right","操作提示");
	} else if(navigator.userAgent.indexOf("Opera") != -1) {        
		window.location = arg_str_text;        
	} else if (window.netscape) {        
		try {        
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");        
		} catch (e) {   
			showDialog("无法将内容复制到剪贴板，请手动复制内容。\n解决方法：\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'","right","操作提示");
				        
		}        
		var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);        
		if (!clip)  return;        
		var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);        
		if (!trans)  return;        
		trans.addDataFlavor('text/unicode');        
		var str = new Object();        
		var len = new Object();        
		var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);        
		var copytext = arg_str_text;        
		str.data = copytext;        
		trans.setTransferData("text/unicode",str,copytext.length*2);        
		var clipid = Components.interfaces.nsIClipboard;        
		if (!clip)  return false;        
		clip.setData(trans,null,clipid.kGlobalClipboard); 
		showDialog("内容已经复制到剪贴板！","right","操作提示");
		      
	}        
}
//延迟切换
function delayCrollbar (orithat,orithatbox) {
		orithat.hover(function () {
				var i= orithat.index(this);
				this.timer = setTimeout(function () {
					orithat.eq(i).addClass("on").siblings().removeClass("on");
					orithatbox.hide();
					orithatbox.eq(i).show();},200);
			},
		function () {
			clearTimeout(this.timer);
		})
	}

/**
 * 按钮登录验证
 **/
function user_check(url){
	if(check_user_login()){
		location.href = url;
		return false;
	}
}
// 返回顶部
function goTopEx(){
	var obj=document.getElementById("goTopBtn");
	function getScrollTop(){
		if(/Chrome/.test(navigator.userAgent)){
			return document.body.scrollTop;
		}
		return document.documentElement.scrollTop;
	};
	function setScrollTop(value){
		if(/Chrome/.test(navigator.userAgent)){
			document.body.scrollTop=value;
		}
		document.documentElement.scrollTop=value;
	}
	window.onscroll=function(){
		getScrollTop()>500?obj.style.display="block":obj.style.display="none";
	};
	getScrollTop()>500?obj.style.display="block":obj.style.display="none";
	obj.onclick=function(){
		var goTop=setInterval(scrollMove,10);
		function scrollMove(){
			setScrollTop(getScrollTop()/2.5);if(getScrollTop()<1)clearInterval(goTop);
		}
	}
}

//滚动代码
function startmarquee(lh,speed,delay,index){
var t;
var p=false;
var o=document.getElementById("marqueebox"+index);
o.innerHTML+=o.innerHTML;
o.onmouseover=function(){p=true}
o.onmouseout=function(){p=false}
o.scrollTop = 0;
function start(){
t=setInterval(scrolling,speed);
if(!p) o.scrollTop += 2;
}
function scrolling(){
if(o.scrollTop%lh!=0){
o.scrollTop += 2;
if(o.scrollTop>=o.scrollHeight/2) o.scrollTop = 0;
}else{
clearInterval(t);
setTimeout(start,delay);
}
}
setTimeout(start,delay);
}
function noshop(){
	showDialog("Sorry,您查看的商铺暂未开通",'alert','友情提示');return false;
}
//判断图片是否载入完成
function SImage(callback){
	var img = new Image();
	this.img = img;
	var appname = navigator.appName.toLowerCase();
	if (appname.indexOf("netscape") == -1){
			//ie
			img.onreadystatechange = function () {
			if (img.readyState == "complete"){
				callback(img);
				}
			};
		} else {
			//firefox
			img.onload = function () {
			if (img.complete == true){
				callback(img);
			}
		}
	}
}
SImage.prototype.getimg = function (mageurl){
	if ( mageurl )
		this.img.src = mageurl;
}
//控制图片的大小
function DrawImage(ImgTag,FitWidth,FitHeight)
{
 var image = new Image();
 image.src = ImgTag.src;
 if(image.width>0 && image.height>0){
  if(image.width/image.height >= FitWidth/FitHeight){
   if(image.width > FitWidth){
    ImgTag.width = FitWidth;
    ImgTag.height = (image.height*FitWidth)/image.width;
   }
   else{ 
    ImgTag.width = image.width;
    ImgTag.height = image.height;
   }
  }
  else{
   if(image.height > FitHeight){
    ImgTag.height = FitHeight;
    ImgTag.width = (image.width*FitHeight)/image.height;
   }
   else{
    ImgTag.width = image.width; 
    ImgTag.height = image.height;
   }
  }
 }
}

function load_header_top() {
	var username = getcookie('username');
	var header_top_left = '<span class="pl_5"><a class="s_lz red" href="/zt/APPS/android/" target="_blank"><img style="vertical-align:-2px;" src="/tpl/default/theme/simple/img/system/ico-12x150_new.gif" alt="手机版"/>手机版</a>&nbsp;|&nbsp;欢迎您,'+
							'<span id="nav_pull5" class="po_re"><a href="' + SITEURL + '/index.php?do=user&view=index" class="pl_5 c06c pr_5">'+username+'<span>▼</span></a>'+
								'<div class="option t_l clearfix hidden">'+
									'<div class="title_again"> <a href="' + SITEURL + '/index.php?do=user&view=index">'+username+'<span>▼</span></a> </div>'+
									'<dl>'+
										'<dt>'+username+'</dt>'+
										'<dd>'+
											'<ul class="float clearfix">'+
												'<li><a href="' + SITEURL + '/index.php?do=user&view=index" rel="nofollow">账号管理</a></li>'+
												'<li><a href="http://s.epweike.com/portal.php" rel="nofollow">一品论坛</a></li>'+
												'<li><a href="javascript:void(0);" onclick="logout();">退出</a></li>'+
											'</ul>'+
										'</dd>'+
									'</dl>'+
								'</div>'+
							'</span>'+
							'</span>'+
							'<a href="' + SITEURL + '/index.php?do=user&view=message">站内信<font class="cc00 fontb" id="messagecount_1"></font></a>'+
							'&nbsp;<a href="javascript:void(0);" onclick="logout();">退出</a>';

	$(document).ready(function(){
		$("#index_r_bar").html(header_top_left);
		setInterval(function(){$.get('/index.php?do=ajax&view=ajax&ac=noop&t=' + new Date().getTime())}, 600000);
	});
}

function yun_load_header_top() {
	var header_top_left = '<span class="top_lft fl_l"><a class="ico_pc" href="/zt/APPS/android/" target="_blank">電腦版</a>&nbsp;|&nbsp;歡迎您,'+
							'<span id="nav_pull5" class="po_re"><a href="' + ROOTURL + '/index.php?do=user&view=index" class="pl_5 c06c pr_5">'+username+'<span>▼</span></a>'+
							'</span>'+
							'</span>'+
							'<a href="' + ROOTURL + '/index.php?do=user&view=message">站內信<font class="cc00 fontb" id="messagecount_1"></font></a>'+
							'&nbsp;<a href="javascript:void(0);" onclick="logout();">登出</a>';
	$(document).ready(function(){
		$("#index_r_bar").html(header_top_left);
		setInterval(function(){$.get('/index.php?do=ajax&view=ajax&ac=noop&t=' + new Date().getTime())}, 600000);
	});
}

function load_header_right(){
	if (username) {
		if(typeof(ROOTURL)=='undefined'){
			var url = SITEURL; 
			var login='会员登陆';
			var task_manage='任务管理';
			var task_1='我发布的任务';
			var task_2='我参加的任务';
			var task_3='我的站内信';
			var task_4='收藏夹';
			var finance='财务管理';
			var finance_1='财务明细';
			var finance_2='我要充值';
			var finance_3='我要提现';
		} else{
			var url = ROOTURL; 
			var login='會員登陸';
			var task_manage='任務管理';
			var task_1='我發佈的任務';
			var task_2='我參與的任務';
			var task_3='我的站内信';
			var task_4='我的最愛';
			var finance='財務管理';
			var finance_1='財務明細';
			var finance_2='我要儲值';
			var finance_3='我要提現';
		}
		var header_right = '<div class="logintolinner fl_l">'+
								'<div class="loginlitb_name">'+
									'<div class="loginlitb_topname">'+
										'<span class="icoaraw">&nbsp;</span>'+
										"<span id='top_u_pic'><img alt='"+login+"' src='"+url+"/tpl/default/theme/simple/img/2013/defalheid.jpg' original-title=''></span>"+task_manage+
									'</div>'+
									'<div class="loginlitb_box" style="display:none;">'+
										'<div class="afterlogin_task">'+
											'<ul>'+
												'<li><a href="'+url+'/user-view-employer-op-task-opp-xsrw.html" target="_blank">&gt;&nbsp;&nbsp;'+task_1+'</a></li>'+
												'<li><a href="'+url+'/user-view-witkey-op-task-opp-xsrw.html" target="_blank">&gt;&nbsp;&nbsp;'+task_2+'</a></li>'+
												'<li><a href="'+url+'/index.php?do=user&view=message" target="_blank">&gt;&nbsp;&nbsp;'+task_3+'<span id="messagecount_2"></span></a></li>'+
												'<li><a href="'+url+'/index.php?do=user&view=witkey&op=collect" target="_blank">&gt;&nbsp;&nbsp;'+task_4+'</a></li>'+
											'</ul>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>'+
							'<div class="logintolinner logintooset fl_r">'+
								'<div class="loginlitb_name">'+
									'<div class="loginlitb_topname t_c">'+
									'<span class="icoaraw">&nbsp;</span>'+
									finance+
									'</div>'+
									'<div class="loginlitb_box" style="display:none;">'+
										'<div class="afterlogin_task">'+
											'<ul>'+
												'<li><a href="'+url+'/index.php?do=user&view=finance&op=detail" target="_blank">&gt;&nbsp;&nbsp;'+finance_1+'</a></li>'+
												'<li><a href="'+url+'/index.php?do=user&view=finance&op=recharge" target="_blank">&gt;&nbsp;&nbsp;'+finance_2+'</a></li>'+
												'<li><a href="'+url+'/index.php?do=user&view=finance&op=withdraw" target="_blank">&gt;&nbsp;&nbsp;'+finance_3+'</a></li>'+
											'</ul>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>';
		$("#menberEnter").html(header_right);
	}
}

function user_register(msg){
	$("#reg_btn").attr("disabled",true);
	$("#reg_btn").text("请您耐心等待");
	if(INDEX!='yun'){
		$("#reg_btn").removeClass("submit");
	}else{
		$("#reg_btn").addClass("grey");
	}
	var i = checkForm(document.getElementById("register_frm"));
    if (i) {
		// showWindow('register_frm1', 'register_frm', 'post',0,{cover:1});
    	if(typeof(ROOTURL)=='undefined'){
    		document.getElementById('register_frm').submit();
    	}else{
    		var code_url = $("#txt_code").attr('ajax');
    		var code = $("#txt_code").val();
    		$.get(code_url+code,function(data){
    			if($.trim(data)==true){
    				$.post($("#register_frm").attr('action'),$("#register_frm").serialize(),function(json){
    	    			if(json.status == 1){
    	    				 //showDialog(json.msg, 'right', '消息提示', function(){window.location=json.data.url;}, 'cover', '',1)
    	    				 window.location=json.data.url;
    	    			}else{
    	    				 showDialog(json.msg, 'alert');
    	    				 $("#formhash").val(json.data.formhash);
    						 $("#reg_btn").attr("disabled",false);
    				    	 $("#reg_btn").text(msg);
    				    	 if(INDEX!='yun'){
    				    		 $("#reg_btn").addClass("submit");
    				    	 }else{
    				    		 $("#reg_btn").removeClass("grey");
    				    	 }
    	    			}
    	    		},'json');
    			}else{
    				 $("#reg_btn").attr("disabled",false);
	       	    	 $("#reg_btn").text(msg);
	       	    	 if(INDEX!='yun'){
	       	    		 $("#reg_btn").addClass("submit");
	       	    	 }else{
	       	    		 $("#reg_btn").removeClass("grey");
	       	    	 }
	       	  		 return false;
    			}
    		});
    	}
     }else{
    	 $("#reg_btn").attr("disabled",false);
    	 $("#reg_btn").text(msg);
    	 if(INDEX!='yun'){
    		 $("#reg_btn").addClass("submit");
    	 }else{
    		 $("#reg_btn").removeClass("grey");
    	 }
  		 return false;
	 }
}

/**
 * 获取币种转换后的值
 * @param value 要转换的值
 * @param obj_str 要显示的地方ID字符串，用,隔开
 * @param res_bool 判断是否有反回值 0为无，1为有
 * @param cur_coin 目前的币种代码
 * @param new_coin 要转成的币种代码
 * @param carry 是否四舍五入进位
 */
function get_swap_coin(value,obj_str,res_bool,cur_coin,new_coin,carray){
	var cur_coin = cur_coin ? cur_coin : 'CNY';
	var new_coin = new_coin ? new_coin : 'TWD';
	var carray = carray ? carray : 0;
	var res_booler = res_bool ? false : true;
	var obj_str = obj_str ? obj_str : '';
	var result = 0;
	var mon = 0;
	mon = parseFloat(value);
	$.ajax({
		url:'/index.php?do=ajax&view=ajax&ac=swapcoin',
		async:res_booler,
		data:{money:mon,curcoin:cur_coin,newcoin:new_coin,carray:carray},
		success:function(msg){
			result = msg && (msg != 'NaN') ? msg : result;
			result = parseFloat(result);
			if(obj_str){
				obj_arr = obj_str.split(',');
				for(var i=0;i<obj_arr.length;i++){
					$('#'+obj_arr[i]).val(result);
					$('#'+obj_arr[i]).text(result);
					$('#'+obj_arr[i]).html(result);
				}
			}
		}
	});
	if(res_bool){
		return result;
	}
}
;$(function(){
	var refromet=document.referrer; 
	var recenturl=window.location.href;
	if (refromet.indexOf("case91")>0 && recenturl.indexOf('epweike')>0) {
		var comefromlegth = document.cookie.indexOf("yunepweike");
		if (comefromlegth<0){
			showDialog("<div class='winbody pt_10'><div class='t_c pt_20 pb_20'><div style='color:#0B72BA'>雲創平台已替您導向一品威客網，共享兩岸任務及人才資源</div><div class='mar10'><img src='/tpl/default/theme/simple/img/yun/enterepweike.png'></div></div></div>","info","歡迎雲創平台用戶","","cover");
			setcookie("comefrom", "yunepweike", "86400",'/')
			setTimeout(function(){hideMenu('fwin_dialog', 'dialog');},4000)
		}
	}
})

