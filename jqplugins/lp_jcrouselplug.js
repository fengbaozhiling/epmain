$('document').ready(function(){
	$('#jcarousel').jcarousel({
		wrap: 'circular',
	 animation: 200
	}).jcarouselAutoscroll({
	   interval:  3000
	});
	
	$('#ajaxwaitid').show();
	
		window.onload=function(){
	$('#ajaxwaitid').hide();
	$('.case_show').removeClass('hidden');
	
			$('#comaypub').masonry({
	  itemSelector: '.item'
	});
	
	
		}
	
	/*$('.shop_info_boxs').hover(
	function(){$('.shop_info_two').removeClass('hidden')},
	function(){$('.shop_info_two').addClass('hidden')
	});*/
	
	if($('.shop_adv1 img,.shop_adv2 img').length){
	var adv1_h=$('.shop_adv1').height();
	var adv1_w=$('.shop_adv1').width();
	$('#ie6 .shop_adv1').css({'height':adv1_h,'width':adv1_w});
	
	var adv2_h=$('.shop_adv2').height();
	var adv2_w=$('.shop_adv2').width();
	$('#ie6 .shop_adv2').css({'height':adv2_h,'width':adv2_w});
	}
})