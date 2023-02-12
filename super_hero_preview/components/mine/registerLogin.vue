<template>
	<view class="register_login">
		<form @submit="formSubmit" class="form">
			<view class="face_wrapper">
				<image src="../../static/icons/default-face.png" mode="" class="face"></image>
			</view>
			<view class="info_wrapper">
				<text class="words_lbl">账号</text>
				<input type="text" name="username" class="input" placeholder="请输入用户名" placeholder-class="graywords"/>
			</view>
			<view class="info_wrapper password_wrapper">
				<text class="words_lbl">密码</text>
				<input type="password" name="password" class="input" placeholder="请输入密码"  placeholder-class="graywords"/>
			</view>
			<button type="primary" form-type="submit" class="send_btn">登录/注册</button>
		</form>
		<!-- 第三方登录 -->
		<!-- #ifdef APP-PLUS -->
		<view class="third_wrapper">
			<view class="third_line">
				<text class="txt">第三方账号登录</text>
			</view>
			<view class="third_icon_wrapper">
				<image src="../../static/icons/weixin.png" @click="appLogin('weixin')" class="third_icon" mode=""></image>
				<image src="../../static/icons/QQ.png" @click="appLogin('qq')" class="third_icon" mode=""></image>
				<image src="../../static/icons/weibo.png" @click="appLogin('sinaweibo')" class="third_icon" mode=""></image>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<button open-type="getUserInfo" @getuserinfo="wxLogin" class="wx_login">微信一键登录</button>
		<!-- #endif -->
		<view @click="$emit('forCanel')">
			<Canel />
		</view>
	</view>
</template>

<script>
	import Canel from '../common/canel.vue'
	export default{
		methods:{
			// 表单提交
			formSubmit(e){
				const username=e.detail.value.username.trim()
				const password=e.detail.value.password.trim()
				if(!username){
					uni.showToast({
						icon:'none',
						title:'请输入用户名'
					})
					
					return false
				}
				if(!password){
					uni.showToast({
					    title: '请输入密码',
						icon:'none'
					})
					return false
				}
				if(username=='admin' && password!='admin'){
					uni.showToast({
					    title: '账号或密码错误',
						icon:'none'
					})
					return false
				}
				// 模拟登录
				uni.request({
					url:'/',
					complete:res=> {
						// 缓存用户信息
						uni.setStorage({
							key:'userInfo',
							data:{
								avatar:'../../static/icons/108x108.png',
								username,
								ID:'123456789',
								sex:-1,
								birthday:'2020-05-20'
							}
						})
						// 页面切换
						this.$emit('forCanel')
					}
				})
			},
			// APP第三方登录-注意填写App SDK登录鉴权：appid appkey……
			appLogin(loginType){
				uni.login({
					provider:loginType,
					success:res=>{
						uni.getUserInfo({
							provider:loginType,
							success:info=>{
								// 成功获取用户信息
								console.log(info)
								const {userInfo}=info
								let avatar,name,id
								switch(loginType){
									case 'weixin':{
										avatar=userInfo.avatarUrl
										name=userInfo.nickName
										id=userInfo.openId
									};break;
									case 'qq':{
										avatar=userInfo.figureurl_qq_2
										name=userInfo.nickName
										id=userInfo.openId
									};break;
									case 'sinaweibo':{
										avatar=userInfo.avatar_large
										name=userInfo.nickName
										id=userInfo.id
									};break;
									default:null
								}
								console.log(avatar,name,id)
								// 登录
								uni.request({
									
								})
							}
						})
					}
				})
			},
			// 微信端登录
			wxLogin(e){
				const userData = e.detail.userInfo
				console.log(userData)
				uni.login({
					provider:'weixin',
					success:res=>{
						// 获取用户的授权码-code
						const {code} = res
						// 此处为模拟获取到用户信息后进行登录
						uni.setStorage({ //缓存
							key:'userInfo',
							data:{
								avatar:userData.avatarUrl,
								username:userData.nickName,
								ID:code,
								sex:-1,
								birthday:'2020-05-20'
							}
						})
						// 页面切换
						this.$emit('forCanel')
					}
				})
			},
		},
		components:{Canel}
	}
</script>

<style lang="scss" scoped>
	.register_login{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9;
		padding: 0 40upx;
		border-top: 1px solid #dbdbda;
		background-color: #F8F8F8;
		.form{
			.face_wrapper{
				display: flex;
				flex-direction: row;
				justify-content: center;
				margin: 120upx auto;
				.face{
					width: 160upx;
					height: 160upx;
				}
			}
			.info_wrapper{
				display: flex;
				flex-direction: row;
				justify-content: center;
				border-bottom: 1px solid #dbdbda;
				padding-bottom: 20upx;
				.words_lbl{
					color: #808080;
				}
				.input{
					width: 500upx;
					margin-left: 40upx;
				}
			}
			.password_wrapper{
				margin-top: 40upx;
			}
			.send_btn{
				width: 90%;
				margin-top: 60upx;
			}
			
		}
		.third_wrapper{
			margin-top: 50upx;
			.third_line{
				position: relative;
				margin: auto;
				width: 90%;
				text-align: center;
				&::after{
					content: '';
					position: absolute;
					top: 20upx;
					left: 0;
					right: 0;
					z-index: -1;
					width: 100%;
					height: 1px;
					background-color: #ccc;
				}
				.txt{
					color: #999;
					font-size: 14px;
					letter-spacing: 0.1em;
					padding: 0 20upx;
					background-color: #F8F8F8;
				}
			}
			.third_icon_wrapper{
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				margin-top: 40upx;
				.third_icon{
					width: 80upx;
					height: 80upx;
					margin-right: 60upx;
					&:last-child{
						margin-right: 0;
					}
				}
			}
		}
		.wx_login{
			width: 90%;
			margin-top: 30upx;
		}
		.canel{
			position: absolute;
			top: 30upx;
			right: 30upx;
			color: #808080;
			font-size: 20px;
		}
	}
	.graywords{
		color: #eaeaea;
	}
</style>
