<template>
	<view class="search page">
		<!-- 搜索框 -->
		<view class="search_block">
			<view class="search_icon_wrapper">
				<image src="../../static/icons/search.png" mode="" class="search_icon"></image>
			</view>
			<input type="text" value="" focus confirm-type="search" @input="toSearch" @confirm="toSearch" placeholder="找预告" maxlength="10" class="search_text"/>
		</view>
		
		<!-- 电影列表 -->
		<view class="page_block movie_list">
			<view class="moive_wrapper" v-for="item in searchData" :key="item.id" @click="toDetail">
				<image :src="item.images.small" mode="aspectFill" class="poster"></image>
				<text class="movie_title">{{item.title}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count:12,//请求9条数据
				searchData:[], //数据
				originData:[],//原始数据，此处用于关键字搜索
				keywords:'',//搜索关键字
				page:1,//当前页
				totalPage:1,//总页数
			}
		},
		created() {
			this.getSearchData()
		},
		methods: {
			// 获取总体数据
			getSearchData(){
				uni.showLoading({
					title:'加载中……'
				})
				// 处理再次请求数据
				if(this.originData.length==0){
					const {subjects:dataRes}=require('../../static/mock/coming_soon.json')
					this.originData=dataRes
				}else{
					// 清空数据，避免出现问题
					this.searchData=[]
				}
				// 截取12条数据
				let newArr=[]
				if(this.count>this.originData.length){
					this.count=this.originData.length
				}
				for(let i=0;i<this.originData.length;i++){
					if(i+this.count-12<this.count){
						let item=this.originData[i+this.count-12]
						// 对图片做处理
						item.images.small=item.images.small.replace('https://','https://images.weserv.nl/?url=')
						newArr.push(item)
					}
				}
				this.searchData=[...this.searchData,...newArr]
				uni.hideLoading()
			},
			// 搜索
			toSearch(e){
				const that=this
				let keywords=e.detail.value.trim()
				let newDataArr=[]
				// 根据关键词检索本地数据
				if(keywords){
					newDataArr=that.originData.filter(v=>v.title.search(keywords)>0)
				}else{
					that.getSearchData()
					that.$show({
						icon:'none',
						title:'请输入搜索内容！'
					})
				}
				if(newDataArr.length){ //数据存在
					that.searchData=newDataArr
				}else if(!newDataArr.length && keywords){ //数据不存在且有关键词
					that.searchData=[]
					that.$show({
						icon:'none',
						title:'暂时还没有~'
					})
				}
			},
			// 跳转到详情页-此处用一个固定的页面模拟
			toDetail(){
				uni.navigateTo({
					url:'../detail/detail',
				})
			},
		},
		// 上拉加载
		onReachBottom() {
			if(this.count>=this.originData.length){
				this.$show({
					icon:'none',
					title:'数据已经加载完啦~'
				})
			}else{
				this.count+=12
				this.getSearchData()
			}
		},
		// 转发
		onShareAppMessage(){},
		// 分享到朋友圈
		onShareTimeline(){},
	}
</script>

<style lang="scss" scoped>
.search{
	background-color: #F7F7F7;
	.search_block{
		display: flex;
		flex-direction: row;
		padding: 0 20upx 20upx 20upx;
		background-color: #F8F8F8;
		position: fixed;
		top: 100;
		z-index: 9;
		.search_icon_wrapper{
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: 0 10upx;
			background-color: #eaeaea;
			.search_icon{
				width: 40upx;
				height: 40upx;
			}
		}
		.search_text{
			font-size: 14px;
			height: 60upx;
			width: 650upx;
			background-color: #eaeaea;
		}
	}
	.movie_list{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 72upx 10upx 0 10upx;
		background-color: #F7F7F7;
		.moive_wrapper{
			display: flex;
			flex-direction: column;
			padding: 10upx;
			margin: 18upx 34upx 0 0;
			box-sizing: border-box;
			border-radius: 2%;
			background-color: #fff;
			&:nth-child(3n){
				margin-right: 0;
			}
			.poster{
				width: 200upx;
				height: 270upx;
			}
			.movie_title{
				width: 200upx;
				color: #808080;
				text-align: center;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
		
	}
}
</style>
