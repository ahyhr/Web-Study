<!-- 头像选择，无裁剪，预备方案 -->
<template>
	<view class="choice_avatar page">
		<view class="pending_wrapper">
			<image id="face" :src="avatarPath" mode="scaleToFill"></image>
		</view>
		<view class="notice">
			<view class="notice_words">
				* 最好选择较为宽高差距不大的图片
			</view>
		</view>
		<view class="footer_opertor">
			<view class="opertor_words" @click="choiceAvatar">
				重新选择
			</view>
			<view class="opertor_words" @click="toUpload">
				确认使用
			</view>
		</view>
		<view class="canel" @click="$emit('forCanel')">✕</view>
	</view>
</template>

<script>
	export default{
		props:{
			avatar:{
				type:String,
				default:'../../static/icons/108x108.png'
			}
		},
		data(){
			return{
				avatarPath:this.avatar, //选择头像的路径
			}
		},
		methods:{
			// 重新选择头像-可以拍照
			choiceAvatar(){
				uni.chooseImage({
					count:1,
					sizeType:['compressed'],
					success:res=>{
						// 获取路径
						this.avatarPath=res.tempFilePaths[0]
					}
				})
			},
			// 上传
			toUpload(){
				uni.showLoading({
					mask:true,
					title:'上传中，请稍后'
				})
				// 模拟数据上传
				uni.uploadFile({
					url:'http://localhost:8080/',
					filePath:this.avatarPath,
					name:'avatar',
					complete:res=>{
						// 读取本地数据进行修改
						uni.getStorage({
							key:'userInfo',
							success:info=>{
								let {data:userData}=info
								userData.avatar=this.avatarPath
								uni.setStorage({
									key:'userInfo',
									data:userData
								})
								uni.hideLoading()
								this.$emit('forCanel')
							}
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.choice_avatar{
		width:100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		background: black;
		.pending_wrapper{
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			height: 75%;
			#face{
				width: 600upx;
				height: 600upx;
			}
		}
		.notice{
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			.notice_words{
				color: gray;
				font-size: 13px;
				margin-top: 30upx;
				width: 600upx;
			}
		}
		.footer_opertor{
			position: fixed;
			/*#ifdef MP*/
			bottom: 0;
			/*#endif*/
			/*#ifndef MP*/
			bottom: 100upx;
			/*#endif*/
			border-top: #515050 solid 1px;
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 30upx;
			.opertor_words{
				color: #e8e5e5;
				font-size: 16px;
				width: 200upx;
			}
		}
	}
	.canel{
		position: absolute;
		top: 30upx;
		right: 30upx;
		color: #808080;
		font-size: 20px;
	}
</style>
