(function myModule(window){
	//私有数据
	var msg = 'My Nmae';
	//操作改数据的函数
	function doSomething(){
		console.log(msg.toUpperCase());
	}
	function doOtherhing(){
		console.log(msg.toLowerCase());
	}
	//向外暴露对象
	window.myModule2 = {
		doSomething:doSomething,
		doOtherhing:doOtherhing
	};
})(window)