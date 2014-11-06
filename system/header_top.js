/**
 * 页头js
 */

$(function(){
	//头部下拉菜单
	$('#nav_pull1,#nav_pull2,#nav_pull3,#nav_pull4,#nav_pull5,#nav_pull6').live({
	   mouseenter:
	   function(){
			$(this).find('div').removeClass('hidden').addClass('block');
			
		},
	   mouseleave:
	   function(){
			$(this).find('div').removeClass('block').addClass('hidden');
		}
	});


	//头部搜索条件切换
	$("#topsearch_task").click(function(){
		$(this).addClass("selected");
		$("#topsearch_talent").removeClass("selected");
		$("#topsearch_type").val("task_list");
	});
	
	$("#topsearch_talent").click(function(){
		$(this).addClass("selected");
		$("#topsearch_task").removeClass("selected");
		$("#topsearch_type").val("talent");
	});
	
	
	//头部搜索
	$("#topsearch_btn").click(function (){
		topSearch();
	});
	
	$("#search_task").click(function (){
		topSearch();
	});
	
	$("#search_user").click(function (){
		topSearch1();
	});
});
if($("#search_key").length){
window.document.getElementById('search_key').onkeydown = function(e){
	var e = e ? e : window.event; 
	var code = e.which ? e.which : e.keyCode;     //获取按键值
	if(code==13){
		topSearch();
	}
}
}
function topSearch(){
	var searchKey = $.trim($("#search_key").val());
		if(searchKey&&searchKey!='输入关键词搜索'){
			var type    = $("#topsearch_type").val();
			if(typeof(ROOTURL)!="undefined"){
				if(type=='task_list') type='task';
				var link    = encodeURI("/index.php?do=yun&view="+type+"&k="+searchKey);
			}else{
				var link    = encodeURI("/index.php?do="+type+"&k="+searchKey);
			}
				$('#frm_topsearch').attr('action',link);
			window.document.location.replace(link);
	}
}

function topSearch1(){
	var searchKey = $.trim($("#search_key").val());
		if(searchKey&&searchKey!='输入关键词搜索'){
			var type    = "talent";
			if(typeof(ROOTURL)!="undefined"){
				var link    = encodeURI("/index.php?do=yun&view="+type+"&k="+searchKey);
			}else{
				var link    = encodeURI("/index.php?do="+type+"&k="+searchKey);
			}
			$('#frm_topsearch').attr('action',link);
			window.document.location.replace(link);
	}
}


