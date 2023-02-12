<template>
	<view class="page nickname">
		<form @submit="formSubmitNickname">
			<view class="page_block">
				<input type="text" :value="name" name="nickname" maxlength="10" class="input" placeholder="请输入昵称" placeholder-class="graywords"/>
			</view>
			<button type="primary" form-type="submit" class="submit_btn">确定</button>
		</form>
		<view class="" @click="$emit('forCanel')">
			<Canel />
		</view>
	</view>
</template>

<script>
	import Canel from '../common/canel.vue'
	export default{
		props:{
			name:{
				type:String,
				default:'用户名'
			}
		},
		methods:{
			formSubmitNickname(e){
				uni.showLoading({
					title:'修改中……'
				})
				const name=e.detail.value.nickname.trim()
				if(!name){
					uni.showToast({
						icon:'none',
						title:'昵称不能为空！'
					})
					return false
				}
				uni.getStorage({
					key:'userInfo',
					success:res=>{
						const {data:userInfo}=res
						userInfo.username=name
						uni.setStorage({
							key:'userInfo',
							data:userInfo
						})
						uni.hideLoading()
						this.$emit('forCanel')
					}
				})
			}
		},
		components:{Canel}
	}
</script>

<style scoped>
	.nickname{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
	}
	.page_block{
		margin-top: 100upx;
	}
	.input{
		height: 80upx;
		width: 500upx;
		line-height: 80upx;
		margin-left: 40upx;
	}
	.graywords{
		color: #eaeaea;
	}
	.submit_btn{
		width: 95%;
		margin-top: 40upx;
	}
</style>
