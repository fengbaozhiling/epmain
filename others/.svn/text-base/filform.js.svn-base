var funPlaceholder = function(element) {
var placeholder = "";
//检测是否需要模拟placeholder
if (element && !("placeholder" in document.createElement("input")) && (placeholder = element.getAttribute("placeholder"))) {
	//当前文本控件是否有id, 没有则创建
	var idLabel = element.id ;
	if (!idLabel) {
		idLabel = "placeholder_" + new Date().getTime();
		element.id = idLabel;
	}
	//创建label元素
	var eleLabel = document.createElement("label");
	eleLabel.htmlFor = idLabel;
	eleLabel.style.position = "absolute";
	//根据文本框实际尺寸修改这里的margin值
	eleLabel.style.color = "graytext";
	eleLabel.style.cursor = "text";
	//插入创建的label元素节点
	element.parentNode.insertBefore(eleLabel, element);
	
	//方法
	var funOpacity = function(ele, opacity) {
		if (ele.style.opacity) {
			ele.style.opacity = opacity / 100;
		} else {
			ele.style.filter = "Alpha(opacity="+ opacity +")";    
		}
	}, opacityLabel = function() {
		if (element.value === "") {
			funOpacity(eleLabel, 40);
			eleLabel.innerHTML = placeholder;
		} else {
			eleLabel.innerHTML = "";    
		}
	};
	//事件
	element.onkeyup = function() { opacityLabel(); };
	element.onfocus = function() { opacityLabel(); };
	element.onblur = function() {
		if (this.value === "") {
			funOpacity(eleLabel, 100);
			eleLabel.innerHTML = placeholder;  
		}
	};
	//样式初始化
	if (element.value === "") { eleLabel.innerHTML = placeholder; }
}    
};