/**********************************

说明：
	* 应用对象必须为选项卡签按钮的直接父元素，且父元素内不包含其他非按钮元素
	* tabbox:内容块的直接父元素的 jq 选择器
	* eventye:触发事件名
	* delayTime:切换延迟时间，适用在悬停切换事件中
**********************************/
;(function($){
	$.fn.delayTab = function(options) {
		var settings = $.extend({},$.fn.delayTab.defaults, options);
		var $tab=this.children( settings.tab );
		var $tabbox=$(settings.tabbox );
		return this.each(function(){
			if( settings.delayTime!=false ){
				$tab.hover(function(){
					var i=$tab.index(this);
					$tab.timer = setTimeout(function () {
						$tab.removeClass(settings.addClassover);
						$tab.eq(i).addClass(settings.addClassover);
						$tabbox.children().eq(i).show().siblings().hide();
					},settings.delayTime)
				},
				function () {
					clearTimeout($tab.timer);
				})
			} else {
				$tab[settings.eventye](function(){
					var i=$tab.index(this);
					$tab.removeClass(settings.addClassover);
					$tab.eq(i).addClass(settings.addClassover);
					$tabbox.children().eq(i).show().siblings().hide();
				})
			}
		})
	}
	$.fn.delayTab.defaults = {
		eventye: 'click',//定义切换事件
		addClassover:'select',//定义切换控件增加的样式
		tabbox:'*',
		tab : "*",
		delayTime:false//是否延迟切换，适合配置在鼠标悬停的效果中
	};
})(jQuery);
