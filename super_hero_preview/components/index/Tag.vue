<template>
	<view class="super_hot page_block">
		<view class="hot_title_wrapper">
			<image :src="imgSrc" mode="" class="hot_icon"></image>
			<view class="hot_title">
				{{hotTitle}}
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			imgSrc:String,
			hotTitle:String
		}
	}
</script>

<style lang="scss" scoped>
.super_hot{
	margin-top: 12upx;
	padding: 20upx;
	.hot_title_wrapper{
		display: flex;
		flex-direction: row;
		.hot_icon{
			width: 30upx;
			height: 30upx;
			margin-top: 15upx;
		}
		.hot_title{
			font-size: 20px;
			font-weight: 700;
			margin-left: 20upx;
		}
	}
}
</style>
