/**
 * 任务操作公共js
 */

/**
 * 加载分享的显示菜单
 */


$(function() { 
	/*$(".state_detail").click(function() {
		$(this).prev().slideUp();
		$(".state_detail").slideUp();
		$(this).slideDown('slow');
	})*/

	//任务状态描述
	$(".state_title").click(function() {
		$(".state_title").slideDown(200);
		$(this).slideUp(200);
		$(".state_detail").slideUp(200);
		$(this).next().slideDown(200);
	})
	$('.sum_content').live('hover',function(){
		$(this).css('z-index',2);
	})
	$('.sum_content').live('mouseleave',function(){
		$(this).css('z-index',1);
	})

	if($('.work_button_box').children('span,a').length==0){
		$('.work_button_box').hide();
	}
	$(".user_info").live("hover",function(){
		hoverDetail(this);
	});
	$(".user_info").live("mouseleave",function(){
		leaveDetail(this);
	});
	
	$(".arrow-bottom-left,.arrow-top-right").click(function(){
		$("#left_nav").toggleClass("hidden");
		$("#top_nav").toggleClass("hidden");
		setcookie('nav-arrow-'+task_id,$(this).attr("id"),3600);
	})
	var nav_arrow = getcookie('nav-arrow-'+task_id);
	if(nav_arrow){
		if(nav_arrow=='arrow-bottom-left'){
			$("#top_nav").addClass("hidden");
			$("#left_nav").removeClass("hidden");
		}else if(nav_arrow=='arrow-top-right'){
				$("#left_nav").addClass("hidden");
				$("#top_nav").removeClass("hidden");
			}	
	}
})
function goComm(work_id){
	$('html,body').animate({'scrollTop':$('#work_'+work_id+'_file').offset().top-150},500);
}
var detailUID = new Array();
function hoverDetail(obj){
	var user_id = $(obj).attr("uid");
	var wid    = $(obj).attr("wid");
	$(obj).children('.user_detail').removeClass('hidden');
	if($(obj).children('.user_detail').text().length==0&&!detailUID[wid]){
		$(obj).children('.user_detail').load("/index.php?do=ajax&view=menu&ajax=user_detail&user_id="+user_id);
		detailUID[wid]=1;
	}
}
function leaveDetail(obj){
	$(obj).children('.user_detail').addClass('hidden');
}
/**产权协议书**/
function protocol_window(){
	var url = '/index.php?do=ajax&view=task&ajax=protocol';
	showWindow('protocol',url,'get',0);
	return false;
}
//申请开票弹窗
function apply_invoice(taskId,invoicestatus){
	if(invoicestatus==1){
		showDialog("该任务已申请过开票，请前往发票管理页面查看。",'alert','操作提示');
	}else{
		showWindow("invoice","/index.php?do=ajax&view=invoice&taskid=" + taskId,'get',0);return false;
	}
}
//取消申请开票
function cancel(obj){
    var url = obj.href;
    showDialog("确定要取消申请吗？", "confirm", "操作提示", function(){
	   siteSub(url,1,false);
    });
    return false;
}
/**
 * 稿件附件加载
 */
function loadFile(work_id){
	if(!$("#work_"+work_id+"_file").html()){
		$("#work_"+work_id+"_file").load("/index.php?do=ajax&view=file&ajax=load&work_id="+work_id);
	}else{
		$("#work_"+work_id+"_file").toggle();
	}
	$('html,body').animate({scrollTop:$("#work_"+work_id+"_file").offset().top-200});
}

function loadsourceFile(work_id){
	showDialog($('#work_source'+work_id+'_file').html(),"right","查看源文件");
}
/**
 * 稿件留言加载
 */
function loadComment(obj,work_id,work_uid){
	if($("#work_"+work_id+"_comment").has("div.old_comment").length==0){
		$("#work_"+work_id+"_comment").load("/index.php?do=ajax&view=task&ajax=work_comment&task_id="+task_id+"&work_id="+work_id+"&work_uid="+work_uid);
		//$('#work_'+work_id+'_comment').show();
	}
}

/**
 * 重载稿件留言区
 */
function reloadComment(work_id,work_uid){
	$("#work_"+work_id+"_comment").empty();
	$("#work_"+work_id+"_comment").load("/index.php?do=ajax&view=task&ajax=work_comment&task_id="+task_id+"&work_id="+work_id+"&work_uid="+work_uid);
}

/**
 * 内容检测
 * @param obj
 * @param event
 */
function checkCommentInner(obj,e){
	var  num   = obj.value.length;
		e.keyCode==8?num-=1:num+=1;
		num<0?num=0:'';
	var Remain = Math.abs(100-num);
		if(num<=100){
			$(obj).next().find(".answer_word").text("你还能输入"+Remain+"个字!");
		}else{
			var nt = $(obj).val().toString().substr(0,100);
			$(obj).val(nt);	
		}
}
/** 需求补充 */
function taskReqedit() {
	if (check_user_login()) {
		showWindow('reqedit',basic_url+'&op=reqedit', 'get', 0);return false;
	}
}
/**任务修改*/
function taskEdit(){
	if(check_user_login()){
		showWindow('edit',basic_url+'&op=edit','get',0);return false;
	}
}
function payitem(item_id){
	if (check_user_login()) {
		showWindow('payitem','/index.php?do=ajax&view=task&ajax=payitem&task_id='+task_id+'&item_id='+item_id, 'get', 0);return false;
	}
}
/**
 * 放弃这个交易
 */
function taskDrop(uid){
	if(check_user_login()){
		showDialog("您确定要放弃这个交易？","confirm","操作提示","taskDrop_detail("+uid+")");
			return false;
	}
}
function taskDrop_detail(uid){
	var url = basic_url+'&op=taskdrop&witkey_uid='+uid;
	$.get(url,function(json){
		if(json.status=='1'){
			showDialog(json.data,"right",json.msg,'location.reload()');
			return false;
		}else{
			showDialog(json.data,"alert",json.msg,'location.reload()');
			return false;
		}
	},"json");
	return true;
}
/**延期加价*/
function taskDelay(){
	if(check_user_login()){
		if(delay_count>=delay_total){
			showDialog("延期次数超过"+delay_count+"次,无法继续延期","alert","操作提示");return false;
		}
		var url = basic_url+'&op=taskdelay';
		showWindow('taskdelay',url,'get',0);return false;
	}
}
/**威客延期*/
function witkey_taskDelay(){
	if(check_user_login()){
		if(witkey_delay_count>=witkey_delay_total){
			showDialog("延期次数超过"+witkey_delay_count+"次,无法继续延期","alert","操作提示");return false;
		}
		var url = basic_url+'&op=witkey_taskdelay';
		showWindow('witkey_taskdelay',url,'get',0);return false;
	}
}
/**威客延期雇主处理*/
function proccess_witkey_task_delay(ac){
	if(check_user_login()){
		var msg = ac==1? '确认同意威客延期请求吗?':'确定拒绝威客延期请求吗?';
		showDialog(msg,"confirm","操作提示","process_delay('"+ac+"')");
	}
}
function process_delay(ac){
	$.post(basic_url+'&op=process_witkey_taskdelay&ac='+ac,function(json){
		if(json.status=='1'){
			showDialog(json.data,'notice',json.msg);
			location.reload();
			return false;
		}else{
			showDialog(json.data,'alert',json.msg);
			return false;
		}
	},'json')
}
/** 
 * 稿件评论
 * @param string obj 当前对象
 * @param int obj_id  对象编号
 */
function work_comment(obj) {
	if (check_user_login()) {
		var obj_id = $(obj).parents(".answer-form").attr("work_id");
		var url = basic_url+'&op=comment&obj_type=work&ban_ajax=1&obj_id=' + obj_id;
		var tar_content = $(obj).parent().siblings(".texare").val();
			if(tar_content.length>100){
				showDialog("您的点评超过字数限制",'alert','操作提示');return false;
			}else if (tar_content.length==0){
				showDialog("您的点评不能为空",'alert','操作提示');return false;
			}else if(tar_content.length>0){
				$.post(url,{tar_content:tar_content},function(json){
					if(json.status==1){ 
             			 //var str=$('<div class="comment_item"><a href="/index.php?do=shop&u_id='+uid+'">'+username+'</a>于'+datePrv+' '+(new Date().toLocaleTimeString())+'评论:'
						 //+'<span class="db">'+json.data+'</span></div>');
             			 // str.appendTo($("#work_"+obj_id+"_comment"));
						reloadComment(obj_id,0);
             			//$(obj).next().text("你还能输入100个字!").end().parent().hide().prev().css({height:"23px"}).val("我要说几句...");
             			$('#work_'+obj_id+'_comment').show();
             			$(obj).parent().siblings(".texare").val("");
             			return false;
					} else if (json.data.error_code == 'auth_mobile'){
						showDialog(json.msg,"confirm",'友情提示',function(){
							location.href="/index.php?do=user&view=setting&op=auth&auth_code=mobile";
						},'','','','马上认证');
						return false;
				    } else{
				    	if(json.data=='ban'){
				    		showDialog(json.msg,'alert','操作提示');
				    	}else{
				    		showDialog(json.data,'alert',json.msg);
				    	}
				    	return false;
					}
				},'json')
			}
	}
}
/**
 * 稿件删除*
 * @param work_id 稿件编号
 */
function workDel(work_id){
	if (check_user_login()) {
		showDialog("确认删除此稿件吗?","confirm","操作提示","delConfirm('"+work_id+"')");
	}
}
/**
 * 删除稿件
 * @param work_id 稿件编号
 */
function delConfirm(work_id){
	$.post(basic_url+'&op=work_del&work_id='+work_id,function(json){
		if(json.status=='1'){
			$("#work_"+work_id+",.work_"+work_id).slideUp(600).remove();
			showDialog(json.data,'notice',json.msg);return false;
		}else{
			showDialog(json.data,'alert',json.msg);return false;
		}
	},'json')
}
c_time();
function c_time() {
	$(".d_time").each(
			function() {
			
				var ed = $(this).attr('ed');
				
				if (ed) {
					var djs = d_time(ed);
					var str = "还剩：" + djs[0] + "天" + djs[1] + "小时" + djs[2]
							+ "分" + djs[3] + "秒";
				} else {
					var str = $(this).attr("title");
				}
				$(this).html(str);
			})
	setTimeout('c_time()', 1000);
}



//对话框提示
function comment_tips(obj_id,content){ 
	var obj_id = obj_id;
	var content = content;  
	var html = $("#"+obj_id).val();  
	
	if(html==content){
		$("#"+obj_id).val(""); 
	} 
	$("#"+obj_id).blur(function (){
		var html = $(this).val();  
		if(html==''){ 
			$(this).val(content); 
		}  
	}); 
}

function loadMarkAid(obj){
	ajaxmenu(obj, 250,'1','2','43');
	return false;
}

//上传源文件
function upload_source(work_id) {
	if (check_user_login()) {
		showWindow("work_source", '/index.php?do=ajax&view=task&ajax=upload_source&task_id='
				+ task_id+'&work_id='+work_id, "get", '0');
		return false;
	}
}

//上传源文件
function upload_bidsource(task_id,work_id) {
	if (check_user_login()) {
		showWindow("work_bidsource", '/index.php?do=ajax&view=task&ajax=upload_bidsource&task_id='
				+ task_id+'&work_id='+work_id, "get", '0');
		return false;
	}
}




/*任务页  留言相关操作js   ↓↓↓↓↓ */
//展开收起
function toggle_commlist(obj,i){
	//初始化的加载数据
	if($('#comment_page').attr('datapage')=='0'){
		load_comment_data(1);
	}
	
	if($(obj).html()=='↑收起任务留言')
	{
		$(obj).html('↓展开任务留言');$('#task_comment_cont_'+i).hide();
	}
	else
	{
		$(obj).html('↑收起任务留言');$('#task_comment_cont_'+i).show();
	}
}

//删除评论
function del_comment(comment_id){
	if(confirm('删除评论同时也会删除回复，并且不可恢复，确定？')){
		$.get("/index.php?do=task&task_id="+task_id+"&view=comment&op=del&comment_id="+comment_id,function(data){
			if(data==''||data==0){
				showDialog("未知原因删除失败","alert","删除失败");return false;
			}
			else if(data=='noaccess'){
				showDialog("您没有权限删除评论","alert","删除失败");return false;
			}
			else{
				$('#reply_record_'+comment_id).remove();
			}
		});
	}
}

//我要评论
function show_comment(tid){
	if($('#comment_page').attr('datapage')=='0'){
		load_comment_data(1);
	}
	$('#link_toggle_a').html('↑收起任务留言');
	$('#task_comment_cont_t_'+tid).show();
	$('#newcomment_box').show();
}

/** 检查用户是否登录(任务页留言专用) */
function check_user_login_task(url) {
	$.getJSON('/index.php?do=release&ac=check_login',function(json){
		if(json.status){
			var content = $('#tar_newcomment').val();
			if(content==''){showDialog("您的留言信息不能为空","alert","留言失败");return false;}
			$.post('/index.php?do=task&task_id='+task_id+'&view=comment&op=add',{content:content},function(data){
				if(data=='ban'){
					showDialog("您的留言信息中有非法关键字","alert","留言失败");return false;
				}else if(data==''){
					showDialog("未知错误，提交失败","alert","留言失败");return false;
				}else if (data=='auth_mobile'){
					showDialog("您好，提交任务留言需要手机认证，您是否去认证？","confirm",'友情提示',function(){
						location.href="/index.php?do=user&view=setting&op=auth&auth_code=mobile";
					},'','','','确定');
					return false;
				}else{
					//$('#comment_page').html('列表更新中..请稍候..');
					loadReply(data);
					$("#tar_newcomment").val("");
					$("#task_comment_cont_t_"+task_id).show();
					//$('#newcomment_box').hide();
				}
			});
		}else{
			showDialog('此项操作需要登录，是否现在登录？', 'confirm', '登录消息提示', 'ajax_login_task()', 0);
			return false;
		}
	})
}

/** ajax_login跳转 */
function ajax_login_task(){	
	showWindow('login', '/index.php?do=ajax&view=login&jump_status=1');
	return false;
}

//提交评论
function submitcomment(){
	check_user_login_task();
}

function loadReply(id){
	if($('#comment_page dd').length==''){
		load_comment_data(1);
	}else{
		$.get('/index.php?do=ajax&view=task&ajax=load_comment&comment_id='+id,function(data){
			$("#newcomment_box").prev().find("dd[id*='reply_record']:last").after(data);
		},'html');
	}
}

//提交评论
function reply_comment(reply_id){
	var content = $('#comment_reply_'+reply_id).val();
	if(content==''){showDialog("您的留言信息不能为空","alert","留言失败");return false;}
	$.post('/index.php?do=task&task_id='+task_id+'&view=comment&op=add&reply_id='+reply_id,{content:content},function(data){
		if(data=='ban'){
			showDialog("您的留言信息中有非法关键字","alert","留言失败");return false;
		}
		else if(data=='nologin'){
			showDialog("您必须先登录","alert","留言失败");return false;
		}
		else if(data=='notacces'){
			showDialog("您没有回复权限","alert","留言失败");return false;
		}
		else if (data=='auth_mobile'){
			showDialog("留言需要先通过手机认证！是否马上进行手机认证？","confirm",'友情提示',function(){
				location.href="/index.php?do=user&view=setting&op=auth&auth_code=mobile";
			},'','','','马上认证');
			return false;
		}
		else if(data==''){
			showDialog("未知错误，提交失败","alert","留言失败");return false;
		}
		else{
			$('#comment_opspan_'+reply_id).show();
			$('#comment_opspan2_'+reply_id).hide();
			var reply = '<div class="pl_10 clearfix"> <div class="c999"><span class="c06c">您</span>的回复——'+content+'</div></div>';
			$('#c_reply_list_'+reply_id).append(reply);
			$("#comment_reply_"+reply_id).val("");
		}
	});
}

//获得列表更新
function load_comment_data(page){
	$('#comment_page').load('/index.php?do=task&task_id='+task_id+'&view=comment&inajax=1&page='+page+' #comment_page').attr('datapage',page);
}

/**
 * 调取稿件回复form
 * comment_id 父级评论编号
 * obj_id 稿件ID
 * work_uid 稿件对应用户
 */
function get_reply_form(comment_id, obj_id, work_uid){
	//删除原本存在的留言回复代码
	$("#reply_zone").remove();
	//关闭稿件留言栏
	//$('#work_comment_box_'+obj_id).hide();
	//组合留言回复代码
	var replystr;
	replystr = "<div id='reply_zone' class='db'><textarea class='txt_input' cols='70' id='comment_reply_content' style='height:30px;' onkeydown='checkCommentInner(this,event)' />";
	replystr = replystr + "<div class='db mt_10'><button type='button' class='button' onclick='reply_work_comment("+ comment_id +","+ obj_id +","+ work_uid +");' value='确定'>回复</button> ";
	replystr = replystr + "<button type='button' class='button' onclick=$('div#reply_zone').remove(); value='取消'>取消</button>";
	replystr = replystr + "<span class='answer_word'>&nbsp&nbsp你还能输入100个字！</span></div>";
	replystr = replystr + "</div>";
	//代码插入网页对应位置
	$("#comment_"+comment_id).append(replystr);
	return false;
}

/**
 * 稿件留言回复提交
 * comment_id 父级ID
 * obj_id 对应稿件ID
 * work_uid 稿件对应用户ID
 */
function reply_work_comment(comment_id, obj_id, work_uid){
	if (check_user_login()) {
		var url = basic_url+'&op=comment_reply&obj_type=work&obj_id='+ obj_id +'&comment_id=' + comment_id;

		var tar_content = $('#comment_reply_content').val();
			if(tar_content.length>100){
				showDialog("您的回复超过字数限制",'alert','操作提示');return false;
			}else if(tar_content.length==0){
				showDialog("您的回复不能为空",'alert','操作提示');return false;
			}else if(tar_content.length>0){
				$.post(url,{tar_content:tar_content},function(json){
					if(json.status==1){ 
						reloadComment(obj_id,work_uid);
						return false;
					}else if (json.data.error_code == 'auth_mobile'){
							showDialog(json.msg,"confirm",'友情提示',function(){
								location.href="/index.php?do=user&view=setting&op=auth&auth_code=mobile";
							},'','','','马上认证');
							return false;
					}else{
						showDialog(json.data,'alert',json.msg);
						return false;
					}
				},'json')
			}
	}
}

//任务详情页缩略图列表增加威客的弹出窗口
$(".title_bosx").bind("mouseenter",function(){
			var titLposit = $(this).offset().left; 
			var titTposit = $(this).offset().top; 
			var u = $(this).attr('uid');
			$(this).css('z-index','2')
			if ($('#pos_'+u).children('.task_tclbox').length){
					$('#pos_'+u).show();
				}else{
					$('<div class="pos_box" id="pos_'+u+'"></div>').appendTo($('#bubble')).load('/index.php?do=ajax&view=file&ajax=bubble_icon&u_id='+u,function(){
						$('#pos_'+u).show().css("left",titLposit+"px").css("top",titTposit+17+"px");
					});
				}
        }).bind("mouseleave",function(){
		var u = $(this).attr('uid');
		$('#pos_'+u).hide();
})
$('.pos_box').live("mouseenter",function(){
		$(this).show();
})
$('.pos_box').live("mouseleave",function(){
		$(this).hide();
})

//2013年新版详情页面新增
$(".steptaks span:last").css("margin-right","auto");
var crentIdex=$(".steptaks").find("span").index($(".crent"))
$(".crentarrow").css("left",43+crentIdex*124+"px")
function protocol(){
	showDialog('message', '/index.php?do=ajax&view=task&ajax=protocol');
}
$(document).ready(function() {
	 //倒计时
	/*$('#countdown').countdown({
	since: $.countdown.UTCDate(-8, 2013,  3-1, 1),
	until:$.countdown.UTCDate(-8, 2013,  4-1, 1), format: 'DHMS', layout: 
	'<span id="timer">'+
	'<span id="timer_days" class="timer_numbers">{dnn}</span>'+'天'+
	'<span id="timer_hours" class="timer_numbers">{hnn}</span>'+'时'+ 
	'<span id="timer_mins" class="timer_numbers">{mnn}</span>'+'分'+
	'<span id="timer_seconds" class="timer_numbers">{snn}</span>'+'秒'+
	'</span>'
	});*/
	$("#TimeCountdown").each(function(){
		var thisTime=$(this).attr("time");
		var thisTimeZone=8; 
		$(this).countdown({
			date: thisTime,
			//htmlTemplate: "%{h} <span class=\"cd-time\">hours</span> %{m} <span class=\"cd-time\">mins</span> %{s} <span class=\"cd-time\">sec</span>",
			offset: thisTimeZone,
			onChange: function( event, timer ){
		
			},
			onComplete: function( event ){
				location.reload();
			},
			leadingZero: true
		});
	})
	//调整招标样式
	$(".putcontent").each(function(){$(this).find(".tkselmt:last").css("border","none")});
	//按钮样式控制
	$(".taskboton").live("mousedown",function(){
		$(this).addClass("hover"); 
	})
	$(".taskboton").live("mouseup",function(){
		$(this).removeClass("hover").addClass("mouseup"); 
	})
	$(".taskboton").live("mouseout",function(){
		$(this).removeClass("hover").removeClass("mouseup"); 
	})
	//展开评论
	$(".pinluncontes").hide();
	$(".closplun").trigger('click');
	$(".closplun").live("click",function(){
		$(this).toggle(function(){
			if($(this).parents(".tkspinlun").next(".pinluncontes").is(":hidden")){
				var num = $(this).children(".cf60").html();
				$(this).html("收起评论（<span class='cf60'>"+num+"</span>）");
				$(this).parents(".putcontent").find(".pinluncontes").slideDown("fast");
				var work_id = $(this).attr("work_id");
				var uid =  $(this).attr("uid");
				if($("#work_"+work_id+"_comment").children("#loading")){
					//reloadComment($(this).attr("work_id"),0);
					loadComment($(this),work_id,uid);
					$("#work_"+work_id+"_comment").children("#loading").remove();
				}
				onCompleteFunc();
			}
            },function(){
               if ($(this).parents(".tkspinlun").next(".pinluncontes").is(":visible")){
			    var num = $(this).children(".cf60").html();
				$(this).html("展开评论（<span class='cf60'>"+num+"</span>）");
				$(this).parents(".putcontent").find(".pinluncontes").slideUp("fast");
			   }
               onCompleteFunc();
			   }
        );
	})
	
	
	$(".task_filter").change(function(){
		$("#form_vip").submit();
	})
	//计件任务中选择多个
	$("#selectall").bind('click',function(){
		if($(this).attr("checked") == true){
			$("input[name='slectlit'][disabled!=true]").attr("checked",true);
		}
		if($(this).attr("checked") == false){
			$("input[name='slectlit'][disabled!=true]").attr("checked",false);
		}
	})
	
	//当右侧内容部分高度超过一定的值，相似任务显示
	var tasktleftHeight=$(".tasktleft").height();
	var tasktrightHeight=$(".taktright").height();
	var taskChazhi=tasktleftHeight-tasktrightHeight;
	$(".taktright").css("padding-bottom","120px");
	$(".tasktleft").css("padding-bottom","120px");
	if (taskChazhi>0){
		$(".taktright").css("height",tasktleftHeight+"px");
	} else if (taskChazhi<0){
		$(".tasktleft").css("height",tasktrightHeight+"px");
	}
	//控制交稿部分的高度
	putconHtext ();
	tksconTc ();
	tksconTx ();
	//控制筛选导航跟随屏幕移动
	if($("#nav_lists_nav").length>0){
		var navH = $("#nav_lists_nav").offset().top;
		var endnavH = navH+$(".taskdetaili").height();
		$(window).scroll(function(){
			var scroH = $(this).scrollTop();
			if(scroH>=navH||scroH<endnavH){
				$("#nav_lists_nav").addClass("nav-fixed");
			} if(scroH<navH){
				$("#nav_lists_nav").removeClass("nav-fixed");
			}if(scroH>=endnavH){
				$("#nav_lists_nav").removeClass("nav-fixed");
			}
		})
	}
	//赏金分配下拉
	$('#rwxq_detail').hover(function(){
		$('#sj_detail').show();
	},function(){
		$('#sj_detail').hide();
	})

 });
$(".box.model .task .box_detail .small_list li").hover(
    function(){$(this).addClass('hover')},
	function(){$(this).removeCss('hover')}
	);
	
	var editor = '';
	var m = r_step  = '';
	$(function(){
		$('#append_parent').ajaxSuccess(function(){
			if($('.tar_content')){
				editor = $(".tar_content").xheditor();
				editor?editor.checkInner():'';
			}
		})
	})