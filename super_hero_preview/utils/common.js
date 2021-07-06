const host='../static/mock'
export const request=options=>{
	options.url=host+options.url;
	options.timeout=5000
	if(!options.type){
		options.method="GET"
	}
	if(!options.header){
		options.header={'Content-Type':'application/json;charset=utf8'}
	}
	if(!options.data){
		options.data={}
	}
	return new Promise((resolve,reject)=>{
		uni.request({
			url:options.url,
			data:options.data,
			success(res) {
				if(res.statusCode==200){
					resolve(res.data)
				}else{
					reject('获取数据失败！')
				}
			},
			fail(err) {
				reject(err)
			}
		})
	})
}
// 显示提示框
export const toast=(options={title:'OK',duration:1200,icon:'success'})=>{
	uni.showToast({
		icon:options.icon,
	    title: options.title,
	    duration: options.duration
	});
}
// 图片批量处理
export const toImg=(arg,reg='https://',rep='https://images.weserv.nl/?url=')=>{
	let newArg=null
	if(arg.constructor===Array){
		newArg=[]
		arg.forEach(item=>{
			newArg.push(item.replace(reg,rep))
		})
	}else{
		newArg=arg.replace(reg,rep)
	}
	return newArg
}