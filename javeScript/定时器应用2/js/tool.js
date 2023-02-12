//obj	对象
			//name	对象样式名
			//dis   距离
			//speed	速度
			//callBack 回调函数   事件完成之后
			function move(obj ,name ,dis , speed ,callBack){
				
				clearInterval(obj.timer);
				
				
				var current = parseInt(getStyle(obj,name));
				//判断方向
				if(current > dis){
					speed = -speed;
				}
				
					//定时器标识写到对象属性中，不会出现有多个定时器覆盖的情况
					obj.timer = setInterval(function(){
						//原位置							//ie	left:0	会返回auto，需要设置下css
						var olddis = parseInt(getStyle(obj,name));
						//获取新位置
						var newdis = olddis + speed;
						//判断位置确定
						if(speed > 0 && newdis >= dis || speed < 0 && newdis <= dis){
							newdis = dis;
						}
						//移动
						obj.style[name] = newdis  +"px";
						//停止定时器位置到800
						if(newdis == dis){
							clearInterval(obj.timer);
							
							//回调函数
							if(callBack){
								callBack();
							}
							// callBack && callBack();
						}
					},30);	
				};	
				
				
				//获取内联样式
			function getStyle(obj , name){
				if(window.getComputedStyle){
					return getComputedStyle(obj,null)[name];
				}else{
					return obj.currentStyle[name];
				}	
			};
