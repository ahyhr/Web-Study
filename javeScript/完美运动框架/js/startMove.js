function startMove(obj, cssObj, func) {
	clearInterval(obj.timer);

	obj.timer = setInterval(function() {
		var isEnd = true; //假设所有运动结束
		for (str in cssObj) { //遍历属性
			var distance = cssObj[str];
			//判断透明度
			if (str == "opacity") {
				iCur = parseInt(parseFloat(getStyle(obj, "opacity")) * 100);
			} else {
				iCur = parseInt(getStyle(obj, str));
			}

			//计算缓冲速度
			var speed = (distance - iCur) / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);


			//判断透明度
			if (str == "opacity") {
				iCur += speed;
				obj.style[str] = iCur / 100;
				obj.style.filter = " alpha(opacity=" + iCur + ")";
			} else {
				obj.style[str] = iCur + speed + "px";
			}
			//如果当前值不等于目的值
			if (iCur != distance) {
				isEnd = false; //没有结束运动
			}

			//运动结束
			if (isEnd) {
				clearInterval(obj.timer);
				if (func) { //改变指向
					func.call(obj);
				}
			}
		}
	}, 20);
};

//获取当前样式
function getStyle(obj, str) {
	if (window.getComputedStyle) {
		return getComputedStyle(obj, null)[str];
	} else {
		return obj.currentStyle[str];
	}
};
