//添加或删除class属性
function toggleClass(obj, str) {
	if (hasCalss(obj, str)) {
		return removeClass(obj, str);
	} else {
		return addClass(obj, str);
	}
};

//添加指定的class属性
function addClass(obj, str) {
	if (!hasCalss(obj, str)) {
		obj.className += " " + str;
	}
};

//删除指定的class属性
function removeClass(obj, str) {
	var reg = new RegExp("\\b" + str + "\\b");
	obj.className = obj.className.replace(reg, "");
};

//判断是否含有该class属性
function hasCalss(obj, str) {
	var reg = new RegExp("\\b" + str + "\\b");
	return reg.test(obj.className);
};
