/*
 *任务发布公有js 
*/

$(function(){
	/*$("#qq").live('click', function(){
		$("#ct_qq").toggle();
	});
	$("#email").live('click', function(){
		$("#ct_email").toggle();
	});
	$("#mobile").live('click', function(){
		$("#ct_mobile").toggle();
	});*/
//	contact();
//	$(":radio[name='contact_type']").click(function(){$(this).attr("checked","checked");contact()});
	
	$("#tar_content").blur(function(){
		contentCheck('tar_content',"任务需求",10,1000);
	});
	
	/*$(".lit_form input:[type='text']").each(function(){
		$(this).val()==''&&$(this).val($(this).attr("ext"));
	});*/

	//每5秒自动保存发布任务表单数据到 COOKIE
	window.setInterval(save_pageinfo,5000);

	if(typeof(m)!='undefined'&&typeof(r_step)!='undefined'&&m&&r_step=='step2'){
		toggLimit(m);
	}
});

uploadBlur = function() {
	if (ifOut("upfile", "5") && $("#upload").val()) {
		upload("upload", "att", "front", "", "", "task")
	} else {
		return false
	}
};

/*
 * 选择任务模型
 * */
function choose_model(model_type){
	switch(model_type){
		case 'reward':
			$('#model_box_reward').show();
			$('#model_box_tender').hide();
			$('#model_box_pre').hide();
			$('#hdn_model_id').val(1);
			$('#li_1').attr('class','selected');
			$('#li_3').attr('class','three_box');
			$('#li_4').attr('class','');
			break;
		case 'tender':
			$('#model_box_reward').hide();
			$('#model_box_tender').show();
			$('#model_box_pre').hide();
			$('#hdn_model_id').val(4);
			$('#li_1').attr('class','');
			$('#li_3').attr('class','three_box');
			$('#li_4').attr('class','selected');
			break;
		case 'pre':
			$('#model_box_reward').hide();
			$('#model_box_tender').hide();
			$('#model_box_pre').show();
			$('#hdn_model_id').val(3);
			$('#li_1').attr('class','');
			$('#li_3').attr('class','selected three_box');
			$('#li_4').attr('class','');
			break;
	}
}

/**
 * 联系方式清空
 */
function contact(){
//	var contact_type = parseInt($(":radio[name='contact_type']:checked").val())+0;
//		if(contact_type=='1'){
//			$(".lit_form input:[type='text']").removeAttr("ignore").removeAttr("disabled").val('');
//		}else{
//			$(".lit_form input:[type='text']").each(function(){
//				$(this).attr("disabled","disabled").attr("ignore","true").val($(this).attr("ext"));
//			})
//		}
}

/**
 * 奖项设置  多人模式专用
 */
function task_prizeset(pcount){
	if(pcount==''||pcount<2){
		pcount = 2;
		$('#txt_prize_count').val(2);
	}
	if(pcount>5){
		pcount = 5;
		$('#txt_prize_count').val(5);
	}
	
	pcount>=2&&$('#prize_1_li').show()||$('#prize_1_li').hide();
	pcount>=2&&$('#prize_2_li').show()||$('#prize_2_li').hide();
	pcount>=3&&$('#prize_3_li').show()||$('#prize_3_li').hide();
	pcount>=4&&$('#prize_4_li').show()||$('#prize_4_li').hide();
	pcount>=5&&$('#prize_5_li').show()||$('#prize_5_li').hide();
	
	prize_valid();
}

/*
 * 计件价格验证
 * */
function valid_single_price(){
	var totle_cash = $('#txt_task_cash_3').val();
	var work_count = $('#txt_work_count').val();
	var single_price = $('#txt_single_price').val();
	
	if(totle_cash==0||totle_cash==''){
		return false;
	}
	if(parseInt(work_count)<2){
		work_count = 2;
		$('#txt_work_count').val(2);
		return false;
	}
	if(parseFloat(single_price)<1){
		single_price = 1;
		$('#txt_work_count').val(1);
		return false
	}
	
	if(parseInt(work_count)*parseFloat(single_price)!=parseFloat(totle_cash)){
		$('#msg_single_price').html('稿件单价*稿件数量不等于任务总金额');
		return false;
	}else{
		$('#msg_single_price').html('');
		return true;
	}
}
/*
 * 计算稿件单价 
 */
function get_each_price(single_min){
	var totle_cash = $('#txt_task_cash1').val();
	var work_count = $('#txt_work_count').val();
	var each_price;
	if(totle_cash==0 || totle_cash==''){
		return false;
	}
	if(work_count==0 || work_count==''){
		return false;
	}

	each_price = totle_cash/work_count;
	each_price = each_price.toFixed(2);
	single_min = single_min ? single_min : 2;
	var curr_str = $('#each_price').attr('curr_str');
	curr_str = curr_str ? curr_str : '元';
	if(each_price<single_min){
		//work_count = totle_cash/2;
		//$('#txt_work_count').val(work_count);
		//$('#txt_single_price').val(2);
		$('#each_price').html('，每个合格稿件至少<strong class="cc30">'+single_min+'</strong> '+curr_str+'。');
	}else{
		$('#txt_single_price').val(each_price);
		$('#each_price').html('，每个合格稿件 <strong class="cc30">'+each_price+'</strong> '+curr_str);
	}
	return true;
}

/*
 * 奖项验证
 * */
function prize_valid(){
	
	var pcount = $('#txt_prize_count').val();
	var t_cash = $('#txt_task_cash1').val();
	
	if(t_cash==''||pcount==''){
		return false;
	}
	$('#msg_prize_valid').hide();
	var mess='';
	var pz_c_cash = 0;//当前填写的总金额,变量不变,值改成比例，保存比例100%才正确
	var part_cash;
	for(var i=1;i<=pcount;i++){
		part_cash = 0;
		if($('#task_prize_'+i).val()==''||$('#task_prize_'+i).val()<=0){
			$('#msg_prize_valid').html(i+'等奖的中标金额未填写');
			$('#msg_prize_valid').show();
			return false;
		}
		
		if(i>=2&&parseInt($('#task_prize_'+i).val())>=parseInt($('#task_prize_'+(i-1)).val())){
			$('#msg_prize_valid').html((i-1)+'等奖的中标金额必须大于'+i+'等奖');
			$('#msg_prize_valid').show();
			return false;
		}
		pz_c_cash += parseInt($('#task_prize_'+i).val());
		//显示比例所占金额
		//part_cash = parseInt($('#task_prize_'+i).val())*t_cash/100;
		//$('#prize_'+i).html(part_cash + ' 元');
	}
	
	if(pz_c_cash != t_cash){
		$('#msg_prize_valid').html('中标金额总和不等于任务金额');
		$('#msg_prize_valid').show();
		return false;
	}
	$('#msg_prize_valid').hide();
	return true;
}

/*
 * 最大天数的默认值判断  赋值
 * */
function valid_task_day(model_id){
	var maxday = $('#task_maxday_'+model_id).val();
	var minday = $('#task_minday_'+model_id).val();
	
	var m_id = model_id;
	if(m_id==2){m_id = 1;} //因为模型1和2同表单
	
	if(!minday||!maxday){
		//未读时重新加载时间规则
		var m_cash = $('#txt_task_cash_'+m_id).val();
		getMaxDday(m_cash,m_id);
		return false;
	}
	
	var nowv = $('#txt_task_period_'+m_id).val();
	if(nowv==''){
		$('#txt_task_period_'+m_id).val(maxday);
		return false
	}
	nowv = parseInt(nowv);
	if(nowv<minday){
		$('#txt_task_period_'+m_id).val(minday);
	}
	else if(nowv>maxday){
		$('#txt_task_period_'+m_id).val(maxday);
	}
	$('#task_tips_'+m_id).html("您的赏金金额任务最长周期为<span class='red'>"+maxday+"</span>天");
	
}


/**
 * 获取相应预算范围内的最大天数
 * @param task_cash
 */
function getMaxDday(task_cash,model_id){
	if(task_cash){
		
		
		$.get('/index.php?do=ajax&view=task&ajax=getmaxday&task_cash='+task_cash+'&model_id='+model_id,function(json){
			//$(".lit_form .pad10 span:last-child").removeClass().text('');
			if(json.status==1){ 	
				//上下限默认值赋予
				var maxday = json.data.maxday;
				var minday = json.data.minday;
				var mincash = json.data.mincash;
				$('#task_maxday').val(maxday);
				$('#task_minday').val(minday);
				switch(model_id){
					case '1':
					case '2':
						/*if(parseFloat($('#txt_task_cash_1').val())<parseFloat(mincash)){
							$('#txt_task_cash_1').val(mincash);
						}*/
						break;
					case '3':
					case '4':
						if(parseFloat($('#txt_task_cash_'+model_id).val())<parseFloat(mincash)){
							$('#txt_task_cash_'+model_id).val(mincash);
						}
						break;
				}
				
				//赋值
				//valid_task_day(model_id);
				
			}else
				return false;
			},'json')
		
		
		
		
		
		
//		$.getJSON(basic_url,{ajax:'getmaxday',task_cash:task_cash},function(json){
//			$(".lit_form .pad10 span:last-child").removeClass().text('');
//			if(json.status==1){ 	
//				 $("#txt_task_day").attr("limit","required:true;type:date;than:min;less:"+json.msg).val(json.msg);
//				 $("#max").val(json.msg); 
//				 var min_day = $("#txt_task_day").attr("min_day");
//				 title=" 预计的任务持续天数,当前预算允许最小天数为:"+min_day+"天,最大截止时间："+json.data;
//				 $("#txt_task_day").attr("title",title); 
//				 $("#txt_task_day").attr("max",json.msg); 
//				 $("#txt_task_day").attr("msg",title);
//			}else
//				return false;
//			})
	}
}

//显示入围评分金额
function show_mark_pay(mark_count,task_cash){
	if(task_cash==''||task_cash<=0){
		$("#eachcash").html("");
		return false;
	}
	var mark_cash = task_cash * 0.1;
	var each_cash = task_cash * 0.1 / mark_count;
	mark_cash = mark_cash.toFixed(2);
	each_cash = each_cash.toFixed(2);
	$("#eachcash").html(" <strong class='cc30'>"+mark_cash+"</strong>元 ，每人获得 "+each_cash+"元");
}

//显示隐藏使用天数的输入框
function show_payitem_num(obj,item_code){
	
	var item_code = item_code;
	var checked = $(obj).attr("checked");  
	if(checked ==true){ 
		if(item_code=='map'){
			$("#set_map").show(); 
			add_payitem($("#item_map"),'add',1);  
		}else{
			$("#span_"+item_code).show();  
		}
	}else{ 	
		if(item_code=='map'){
			add_payitem($("#item_map"),'del',1);  
			$("#set_map").hide(); 
		}else{
			del_payitem(item_code);//删除增值服务
			$("#span_"+item_code).hide(); 
			$("#payitem_"+item_code).val(""); 
		} 
	} 
}


//编辑增值服务
function edit_payitem(item_code){

	var item_code = item_code;
	var payitem_num = parseInt($("#payitem_"+item_code).val());
	var item_cash = parseInt($("#checkbox_"+item_code).attr("item_cash"));
	var total_cash = parseInt( $("#ago_total").val()); 
//	$("#total").html(total_cash+(item_cash*payitem_num)); 
	add_payitem($("#checkbox_"+item_code),'add',payitem_num); 
}

//删除增值服务
function del_payitem(item_code){
	var item_code = item_code;
	var payitem_num = parseInt($("#payitem_"+item_code).val()); 
	add_payitem($("#checkbox_"+item_code),'del',payitem_num);  
}

/**
 * 检查任务周期
 * @returns {Boolean}
 */
function checkDay(){
	var max_day = parseInt($("#txt_task_day").attr("max"))+0;
	var day     = parseInt($("#txt_task_day").val())      +0;
	
	if(day>max_day){
		$("#span_task_day").html("<span>当前任务金额允许最大周期为:"+max_day+"天</span>");
		return false;
	}else
		return true;
}
/**
 * 检测是否同意协议
 */
function checkAgreement(){
	if($("#agreement").attr("checked")==false){
		showDialog("请先同意任务发布协议","alert","操作提示");return false;
	}else return true;
}


//上一步
function stepsave(model_id,step,task_id){
	
	var fromname  = 'frm_step'+step;
	
	if(model_id==''){
		var model_id = $('#hdn_model_id').val();
//		if(model_id==1){
//			model_id = $('#reward_model_id').val();
//		}
	}
	if(step=='2'){
		fromname += '_'+model_id;
	}
	var queryString = $("#"+fromname).formSerialize();
    $.post('/index.php?do=release&r_step=step'+(parseInt(step))+'&model_id='+model_id+'&task_id='+task_id+'&ac=save', queryString, function(json){
        if (json.msg == 1) {
            location.href = '/index.php?do=release&r_step=step'+(parseInt(step)-1)+'&model_id='+model_id+'&task_id='+task_id;
        }
        else {
            showDialog('系统繁忙', 'alert', '错误提示');
        }
    }, 'json');
}

function toggLimit(m){
	/*var limit= 'required:true;type:float;between:';
	var otil = '任务预算,不支持小数,最小金额为';
	var msg  = '任务预算不得为空,最小金额为';
	var min  = 0;
		m==1?min=smin:min=mmin;
		limit+=min;
		otil+=min+'元';
		msg+=min+'元';
	//$('#txt_task_cash_1').attr({'original-title':otil,'limit':limit,'msg':msg});
	//getMaxDday(min,m);
	m==2?prize_valid():'';
	//choose_model('reward');*/
}


function stepCheck(){
	if(typeof(ale)=="function"){
		ale();
	}
	//新版验证start，会影响旧功能，旧页面将不可用
	var i = checkForm(document.getElementById('frm_step'));
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
		//通用验证通过，开始按任务分类验证
		if(pass){
			var task_way = $("#task_way").val();
			var model_id = $("#model_id").val();
			var s_min_cash = Number($("#sreward_min_cash").val());
			var m_min_cash = Number($("#mreward_min_cash").val());
			var p_min_cash = Number($("#preward_min_cash").val());
			var t_min_cash = Number($("#tender_min_cash").val());
			var s_curr_str = $("#sreward_min_cash").attr('curr_str');
			var m_curr_str = $("#mreward_min_cash").attr('curr_str');
			var p_curr_str = $("#preward_min_cash").attr('curr_str');
			var t_curr_str = $("#tender_min_cash").attr('curr_str');
			var task_period1 = Number($("#txt_task_period1").val());
			var task_period2 = Number($("#txt_task_period2").val());
			var task_cash;
			var min_day = Number($("#task_minday").val());
			var max_day = Number($("#task_maxday").val());
			//任务模式验证
			if(task_way==0){
				$('.choosway').addClass('warn');
				if($("#warnmodel").length==0){
					$('.choosway:eq(0)').before('<div id="warnmodel" style="color:red">请选择进行任务的模式</div>');
				}
				window.location.href="#tar_contact"; 
				return false;
			}else if (task_way==1){
				task_cash = Number($("#txt_task_cash1").val());
				//判断是否为task_way==1时必须的分类
				if(model_id==1||model_id==2||model_id==3){
					var g_id      = $("#g_id").val();
					var indus_pid = $("#indus_pid").val();
					var indus_id  = $("#indus_id").val();
					if($("#m"+model_id+"c"+indus_id).length>0){
						all_min_cash = $("#m"+model_id+"c"+indus_id).val();
						all_curr_str = $("#m"+model_id+"c"+indus_id).attr('curr_str');
					}else if($("#m"+model_id+"p"+indus_pid).length>0){
						all_min_cash = $("#m"+model_id+"p"+indus_pid).val();
						all_curr_str = $("#m"+model_id+"p"+indus_id).attr('curr_str');
					}else if($("#m"+model_id+"g"+g_id).length>0){
						all_min_cash = $("#m"+model_id+"g"+g_id).val();
						all_curr_str = $("#m"+model_id+"g"+g_id).attr('curr_str');
					}else{
						if(model_id==1){
							all_min_cash = s_min_cash;
							all_curr_str = s_curr_str;
						}else if(model_id==2){
							all_min_cash = m_min_cash;
							all_curr_str = m_curr_str;
						}else if(model_id == 3){
							all_min_cash = p_min_cash;
							all_curr_str = p_curr_str;
						}
					}
					if(task_cash<all_min_cash){						
						showDialog('预算最小金额为'+all_min_cash+all_curr_str,'alert','金额错误');
						return false;
					}
					
					if(model_id==2){//多赏
						//多赏名次金额判断（待定）
						if(!prize_valid()){
							showDialog('多赏各奖项金额填写有误','alert','金额错误');
							return false;
						}
					}
					if(model_id==3){//计件
						var txt_work_count = Number($('#txt_work_count').val());
						var single_price = Number($('#txt_single_price').val());
						if(txt_work_count==0||single_price==0||single_price<1||parseInt(txt_work_count)!=txt_work_count){
							showDialog('计件数量填写错误','alert','填写错误');
							return false;
						}
					}
					//天数判断
					if(task_period1<min_day||task_period1>max_day){
						showDialog('竞标时间应为'+min_day+'-'+max_day+'天','alert','日期错误');
						return false;
					}
				}else{
					showDialog('请选择任务赏金模式','alert','赏金模式');
					return false;
				}
			}else if(task_way==2){
				task_cash = Number($("#txt_task_cash2").val());
				if(model_id==4||model_id==5){
					if(model_id==4){
						if(task_cash<t_min_cash){
							showDialog('预算最小金额为'+t_min_cash+t_curr_str,'alert','金额错误');
							return false
						}
					}
					//天数判断
					if(task_period2<1||task_period2>30){
						showDialog('竞标时间应为1-30天','alert','日期错误');
						return false;
					}
				}else{
					showDialog('请选择任务赏金模式','alert','赏金模式');
					return false;
				}
			}
		}
		return checkLogin(pass);
	}else{
		return false;
	}
	
	if(r_step=='step2'){
		var i 	 = checkForm(document.getElementById('frm_'+r_step+'_'+$('#hdn_model_id').val()));
	}
	else{
		var i 	 = checkForm(document.getElementById('frm_'+r_step));
	}
	var pass = false;
	switch(r_step){
		case "step1": 
			if(i){ 
				if(contentCheck('tar_content',"任务需求",1,1500,0,'',editor)&&checkAgreement()){
					pass = true;
				}
				else{
					
					if(!checkAgreement()){
						showDialog('您必须同意协议','alert','协议确认');
					}
					else{
						showDialog('需求字数限定1-1500','alert','需求不完整');
					}
				}
				/*if($('#mobile').attr('checked')){
					if(!$('#contact_mobile').val()){pass=false;showDialog("联系电话未填写！","alert","操作提示")}
				}
				if($('#email').attr('checked')){
					if(!$('#contact_email').val()){pass=false;showDialog("email未填写！","alert","操作提示")}
				}
				if($('#qq').attr('checked')){
					if(!$('#contact_qq').val()){pass=false;showDialog("qq未填写！","alert","操作提示")}
				}*/
				if((!$('#mobile').attr("checked")&&!$('#qq').attr("checked")&&!$('#email').attr("checked"))||(!$('#contact_mobile').val()&&!$('#contact_email').val()&&!$('#contact_qq').val())){
					pass=false;
					showDialog("至少填写一种联系方式！","alert","操作提示");
					$('#mobile').attr("checked","checked");
					$('#ct_mobile').show()
				}
			}
			if(pass){
				//清除coodie
				clear_pageinfo();
			}
			return checkLogin(pass);
			break;
		case "step2":
			if(checkDay()){
				if(i){
					pass=true;
				}
			}
			//天数验证
			var model_id = $('#hdn_model_id').val();
			var task_day = parseInt($('#txt_task_period_'+model_id).val());
			if(model_id==1){
				model_id = $('#reward_model_id').val();
			}
			minday = parseInt($('#task_minday_'+model_id).val());
			maxday = parseInt($('#task_maxday_'+model_id).val());
			if(task_day<minday || task_day>maxday){
				if(model_id==1||model_id==2){
					$('#span_task_period_1').attr('class','valid_error');
					$('#span_task_period_1').html('<span>竞标时间不能高于'+maxday+'天</span>');
				}else{
					$('#span_task_period_'+model_id).attr('class','valid_error');
					$('#span_task_period_'+model_id).html('<span>竞标时间不能高于'+maxday+'天</span>');
				}
				return false;
			}
			//金额验证
			if(model_id==1||model_id==2){
				min_cash = $('#sreward_min_cash').val();
				this_cash = $('#txt_task_cash_1').val();
				if(parseInt(this_cash)<parseInt(min_cash)){
					$('#span_task_cash_1').attr('class','valid_error');
					$('#span_task_cash_1').html('<span>预算最小金额为'+min_cash+'元</span>');
					return false;
				}
			}else if (model_id==3){
				min_cash = $('#preward_min_cash').val();
				this_cash = $('#txt_task_cash_'+model_id).val();
				if(parseInt(this_cash)<parseInt(min_cash)){
					$('#span_task_cash_'+model_id).attr('class','valid_error');
					$('#span_task_cash_'+model_id).html('<span>预算最小金额为'+min_cash+'元</span>');
					return false;
				}
			}else if (model_id==4){
				min_cash = $('#tender_min_cash').val();
				this_cash = $('#txt_task_cash_'+model_id).val();
				if(parseInt(this_cash)<parseInt(min_cash)){
					$('#span_task_cash_'+model_id).attr('class','valid_error');
					$('#span_task_cash_'+model_id).html('<span>预算最小金额为'+min_cash+'元</span>');
					return false;
				}
			}
			
			switch($('#hdn_model_id').val()){
				case '1':
					if($('#reward_model_id').val()==2&&!prize_valid())
						pass = false;//奖项规则验证
					break;
				case '3':
					/*if(!valid_single_price())
						pass=false;*/
					pass=true;
					break;
			}

			if(pass==true){
				
				check_pub_priv();
			}
			break;
		case "step3":
			if($("#item_map").attr("checked")==true&&$.trim($("#point").val())==''){
				set_map();return false;
				
				
				
			}else{
				if(i){
					$("#frm_"+r_step).submit();
					$(":input[name='is_submit']").unbind("click").attr("type","button");
				}				
			}
			if(pass==true){
				
				check_pub_priv();
			}
			break;
		case "step4":
			if(pass==true){
				
				check_pub_priv();
			}
			break;
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
			$("#frm_step").submit();
		}else{
			showWindow('login', '/index.php?do=ajax&view=login&visitmode=release&jump_status=1', 'get', 0);
//			showDialog('请登录后再发布','confirm','操作提示',function(){
//				window.open('index.php?do=login','_blank');$('#fwin_dialog,#fwin_dialog_cover').remove();
//			});
			return false;
		}
	})
}
/**
 * 发布权限检测
 * @returns {Boolean}
 */
function check_pub_priv(){
	if('r_step'=='step2'){
		basic_url+='&model_id='+$('#hdn_model_id').val();
	}
	
	$.getJSON(basic_url,{ajax:"check_priv"},function(json){
		if(json.status=='1'){
			if(r_step=='step2'){
				
				$("#frm_"+r_step+'_'+$('#hdn_model_id').val()).submit();
			}
			else{
				$("#frm_"+r_step).submit();
			}
		}else{
			
			showDialog(json.data,"alert",json.msg);return false;
		}
	})
}
/**
 * 增值项添加
 * @param obj 当前对象
 * @param action当前动作  add增加/del删除
 */
function add_payitem(obj,action,item_num){
	
	var item_id = parseInt($(obj).attr('item_id'))+0;
	var item_cash = parseFloat($(obj).attr('item_cash')*item_num);
	var item_name = $.trim($(obj).val());
	var item_code = $.trim($(obj).attr("item_code"));
	var total_cash = parseFloat($("#total").text().toString());//总金

	switch(action){
		case "add":
			$.post(basic_url,{ajax:"save_payitem",item_id:item_id,item_name:item_name,item_cash:item_cash,item_code:item_code,item_num:item_num},function(json){
				$("#total").text(json.msg);
			},'json')
			break;
		case "del":
			$.post(basic_url,{ajax:"rm_payitem",item_id:item_id},function(json){
					$("#total").text(json.msg);
			},'json')
			break;
	}
}
/**
 * 上传完成后的页面响应
 * @param json json数据
 */
function uploadResponse(json){
	if($("#"+json.fid).length<1){//判断是否已有同样的li、
		var file_ids = $("#file_ids").val();
		if(file_ids){
			$("#file_ids").val(file_ids+','+json.fid)
		}else{	
			$("#file_ids").val(json.fid);
		}
	}
   
}

/**
 * 保存页面输入信息
 * 缓存第一步操作所填写的数据
 */
function save_pageinfo(){
	if(document.getElementById("frm_step")){
		//document.cookie = "re_g_id="+$('#g_id').val()+"; path=/";
		document.cookie = "re_indus_pid="+$('#indus_pid').val()+"; path=/";
		document.cookie = "re_indus_id="+$('#indus_id').val()+"; path=/";
		document.cookie = "re_txt_title="+encodeURI($('#txt_title').val())+"; path=/";
		document.cookie = "re_tar_content="+encodeURI($('#tar_content').val())+"; path=/";
		document.cookie = "re_cont_type="+$('#cont_type').val();+"; path=/"
		document.cookie = "re_tar_contact="+$('#tar_contact').val()+"; path=/";
		//document.cookie = "re_contact_mobile="+$('#contact_mobile').val()+"; path=/";
		//document.cookie = "re_contact_qq="+$('#contact_qq').val()+"; path=/";
		//document.cookie = "re_contact_email="+$('#contact_email').val()+"; path=/";
	}
}

/**
 * 清理第一步缓存
 */
function clear_pageinfo(){
	//delCookie("re_g_id");
	delCookie("re_indus_pid");
	delCookie("re_indus_id");
	delCookie("re_txt_title");
	delCookie("re_tar_content");
	delCookie("re_cont_type");
	delCookie("re_tar_contact");
	//delCookie("re_contact_mobile");
	//delCookie("re_contact_qq");
	//delCookie("re_contact_email");
}

//删除cookies
function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    document.cookie= name + "=;expires="+exp.toGMTString()+"; path=/";
} 

//以下获取当前日期 yyyy-mm-dd
function curDateTime(){
	var d = new Date();
	var year = d.getFullYear();
	var month = d.getMonth()+1;
	var date = d.getDate();
	var day = d.getDay();
	var curDateTime= year;
	if(month>9)
	curDateTime = curDateTime +"-"+month;
	else
	curDateTime = curDateTime +"-0"+month;
	if(date>9)
	curDateTime = curDateTime +"-"+date;
	else
	curDateTime = curDateTime +"-0"+date;
	
	return curDateTime;
}

//日期合法性验证
function formatTime(str){
  //var r = str.match(/^(\d{4})[\-|\/](\d{1,2})[\-|\/](\d{1,2})$/);
  var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/); 
  if(r==null) return false;    
  var  d=  new  Date(r[1],   r[3]-1,   r[4]);    
  return  (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);  

}

//| 求两个时间的天数差 日期格式为 YYYY-MM-dd  
function daysBetween(DateOne,DateTwo){  
    var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ('-'));
    var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ('-')+1);
    var OneYear = DateOne.substring(0,DateOne.indexOf ('-'));

    var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ('-'));
    var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ('-')+1);
    var TwoYear = DateTwo.substring(0,DateTwo.indexOf ('-'));

    var cha=((Date.parse(OneMonth+'/'+OneDay+'/'+OneYear)- Date.parse(TwoMonth+'/'+TwoDay+'/'+TwoYear))/86400000);  
    return Math.abs(cha);
}

//取日期天数放入隐藏域
function get_days(enddate,nums){
	if(enddate!=''){
		if(formatTime(enddate)){
			var startdate = curDateTime();
			var task_day = daysBetween(startdate,enddate);
			$('#txt_task_period'+nums).val(task_day);
		}else{
			showDialog("日期填写有误！",'alert',"日期错误");
		}
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
	get_swap_coin(total_cash,'tai_total',0);
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
//检查客服代写需求是否选中
function chechapply(){
	if ($("#apllykefund").attr("checked") == true){
		$("#checkbox_xqws,#kefubb").attr("checked","checked");
		$("tr[servicetr='kefubb']").show();
	}
	if ($("#apllykefund").attr("checked") == false){
		$("#checkbox_xqws").attr("checked","");
		if ($("tr[servicetr='kefubb']").find("input:checked").length==0){
			$("#kefubb").attr("checked","");
			$("tr[servicetr='kefubb']").hide();
		}
	}
	ale();
}
//获取增值服务
function showPayitem(id) {
	if(id) {
		$.post("index.php?do=ajax&view=payitem",{id:id},function(html){
			var str_data = html;
			if(str_data){
				$("#payitem").html(str_data);
				chechapply();
			}
		});
	}
}
