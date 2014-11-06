/**
 * 文章操作公共js
 */

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
//获得列表更新
function load_comment_data(page){
	$('#comment_page').load('/index.php?do=gonglue&view=info&art_id='+art_id+'&op=comment&inajax=1&page='+page+' #comment_page').attr('datapage',page);
}
//展开收起
function toggle_commlist(obj,i){
	//初始化的加载数据
	if($('#comment_page').attr('datapage')=='0'){
		load_comment_data(1);
	}
	
	if($(obj).html()=='↑收起留言')
	{
		$(obj).html('↓展开留言');$('#article_comment_cont_'+i).hide();
	}
	else
	{
		$(obj).html('↑收起留言');$('#article_comment_cont_'+i).show();
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
	$('#article_comment_cont_t_'+tid).show();
	$('#newcomment_box').show();
}

//提交评论
function submitcomment(){
 type = type ? type:'gonglue';
 if(check_user_login()){
	var content = $('#tar_newcomment').val();
	if(content==''){return false;}
	$.post('/index.php?do='+type+'&art_id='+art_id+'&view=info&op=comment&opp=add',{content:content},function(data){
		if(data=='ban'){
			showDialog("您的留言信息中有非法关键字","alert","留言失败");return false;
		}
		else if(data==''){
			showDialog("未知错误，提交失败","alert","留言失败");return false;
		}else if (data=='nocontent'){
			showDialog("您的留言信息为空，请正确填写","alert","留言失败");return false;
		}else{
			if($('#comment_page').attr('datapage')=='0') load_comment_data(1);
			load_new_msg(content);
			$("#tar_newcomment").val("");
			$("#article_comment_cont_t_"+art_id).show();
		}
	});
 }
}
function load_new_msg(content){
	var myDate = new Date();
	var year  = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
	var month = myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
	var day   = myDate.getDate();        //获取当前日(1-31)
	var hour  = myDate.getHours();       //获取当前小时数(0-23)
	var mini  = myDate.getMinutes();     //获取当前分钟数(0-59)
	var sec   = myDate.getSeconds();     //获取当前分钟数(0-59)
	var str  = '<div class="arwoperson clearfix">'+
			  '<div class="fl_l">'+$("#myself").html()+'</div>'+
			  '<div class="wid600 fl_l">'+
			  '<span class="c999"><span class="c06c">'+username+'</span>留言于'+year+"-"+month+"-"+day+" " + hour+":"+mini+":"+sec+'</span>'+
			  '<div class="clearfix c666">'+content+'</div>'+'</div></div>';
	if($('#comment_page .arwoperson').length==''){
		$('#comment_page').html(str);
	}else{
		$("#comment_page").find(".arwoperson:first").before(str);
	}
}
function loadReply(id){
	if($('#comment_page dd').length==''){
		load_comment_data(1);
	}else{
		$.get('/index.php?do=ajax&view=article&ajax=load_comment&comment_id='+id,function(data){
			$("#newcomment_box").prev().find("dd[id*='reply_record']:last").after(data);
		},'html');
	}
}
