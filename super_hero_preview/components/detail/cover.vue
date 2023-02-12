<template>
	<view class="cover_wrapper">
		<view class="cover">
			<image :src="src" mode="widthFix" @click="toCover"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			src:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				
			}
		},
		methods: {// 封面图预览
			toCover(){
				// #ifndef H5
				uni.showActionSheet({
					itemList:['下载图片','返回详情页'],
					complete:res=>{
						if(res.tapIndex==0){
							uni.showLoading({
								title:'保存中……'
							})
							uni.downloadFile({
								url:this.src,
								complete:result=>{
									let tempFilePath=result.tempFilePath
									uni.saveImageToPhotosAlbum({
										filePath:tempFilePath,
										complete:ret=>{
											uni.hideLoading()
											uni.showToast({
												title:'保存成功！'
											})
											
										}
									})
								}
							})
						}
						if(res.tapIndex==1){
							this.$emit('fromCover')
						}
					}
				})
				// #endif
				// #ifdef H5
				this.$emit('fromCover')
				// #endif
			},
			
		}
	}
</script>

<style lang="scss" scoped>
.cover_wrapper{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 9999;
	.cover{
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #000;
		position: fixed;
		top: 0;
		z-index: 9;
	}
}
</style>
