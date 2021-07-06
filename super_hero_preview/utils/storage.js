export const getLocal=(key,field,value)=>{
	const userInfo=uni.getStorageSync(key)
	if(userInfo){
		userInfo[field]=value
		const res=uni.setStorageSync(key,userInfo)
	}
}