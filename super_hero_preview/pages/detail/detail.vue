<template>
	<view class="page movie_detail" v-if="detailData">
		<!-- 播放器 -->
		<view v-if="showVideo" class="player">
			<!-- #ifndef APP-PLUS -->
			<video id="detail_video" autoplay src="http://qo1xme9v6.hn-bkt.clouddn.com/Nine.mp4" poster="http://qo1xme9v6.hn-bkt.clouddn.com/Nine.jpg" controls></video>
			<!-- #endif -->
			<!-- #ifdef APP-PLUS -->
			<video @timeupdate="getVideoUpdate" :initial-time="currentTime" id="detail_video" autoplay src="http://qo1xme9v6.hn-bkt.clouddn.com/Nine.mp4" poster="http://qo1xme9v6.hn-bkt.clouddn.com/Nine.jpg" controls></video>
			<!-- #endif -->
		</view>
		<!-- 电影信息 -->
		<view class="movie_info">
			<image :src="$img(detailData.images.small)" @click="toCover(true)" mode="aspectFill" class="movie_cover"></image>
			<view class="moive_desc">
				<view class="movie_title">{{detailData.title}}</view>
				<view class="movie_base_info">
					<text>{{detailData.year}}</text>-
					<text v-for="(country,c) in detailData.countries" :key="c">{{country}}</text>-
					<text v-for="(language,l) in detailData.languages" :key="language">{{language}}</text>
				</view>
				<view class="movie_base_info">
					<text v-for="(genre,g) in detailData.genres" :key="g">{{genre}}/</text>
				</view>
				<view class="movie_base_info">{{detailData.durations[0]}}</view>
				<view class="movie_base_info">{{detailData.pubdates[0]}}</view>
				<view class="movie_score_wrapper">
					<view class="big_score">
						<view class="score_words">
							综合评分：
						</view>
						<view class="movie_score">
							{{detailData.rating.average}}
						</view>
					</view>
					<view class="score_stars">
						<trailerStar :innerScore="detailData.rating.average" :showNum="0" />
						<view class="prise_counts">
							{{detailData.collect_count}} 人点赞
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 分割线 -->
		<view class="line_wrapper">
			<view class="line"></view>
		</view>
		<!-- 剧情介绍 -->
		<view class="plots_block">
			<view class="plots_title">
				剧情介绍
			</view>
			<view class="plots_desc">
				{{detailData.summary}}
			</view>
		</view>
		<!-- 演职人员 -->
		<view class="scroll_block plots_block">
			<view class="plots_title">演职人员</view>
			<scroll-view scroll-x class="scroll_list">
				<!-- 导演 -->
				<view v-for="(director,index) in detailData.directors" :key="director.id" class="actor_wrapper">
					<image :src="$img(director.avatars.small)" @click="previwImg('directors',index)" mode="aspectFill" class="actor_img"></image>
					<view class="actor_name">{{director.name}}</view>
					<view class="actor_role">{{director.name_en}}</view>
				</view>
				<!-- 主演 -->
				<view v-for="(cast,index) in detailData.casts" :key="cast.id" class="actor_wrapper">
					<image :src="$img(cast.avatars.small)" @click="previwImg('casts',index)" mode="aspectFill" class="actor_img"></image>
					<view class="actor_name">{{cast.name}}</view>
					<view class="actor_role">{{cast.name_en}}</view>
				</view>
			</scroll-view>
		</view>
		<!-- 剧照 -->
		<view class="scroll_block plots_block">
			<view class="plots_title">剧照</view>
			<scroll-view scroll-x class="scroll_list">
				<image v-for="(photo,index) in detailData.photos" :key="photo.id" :src="$img(photo.thumb)"  @click="previwImg('photos',index)" mode="aspectFill" class="plots_img"></image>
			</scroll-view>
		</view>
		<Cover v-if="showCover" :src='$img(detailData.images.small)' @fromCover='toCover(false)'/>
	</view>
</template>

<script>
	import trailerStar from '../../components/common/trailerStar.vue'
	import Cover from '../../components/detail/cover.vue'
	export default{
		data(){
			return{
				detailData:{}, //详情数据
				videoCtx:null, //视频上下文对象
				showCover:false, //是否显示封面图
				showVideo:true, //是否显示video-解决在app中打开封面图时视频显示在上面
				currentTime:0, //已播放视频的时长
			}
		},
		// 页面初次渲染完毕
		onReady() {
			// 获取视频上下文对象
			this.videoCtx=uni.createVideoContext('detail_video')
		},
		onHide() {
			this.videoCtx.pause()
		},
		onShow() {
			if(this.videoCtx)this.videoCtx.play()
		},
		onLoad() {
			// 设置导航栏颜色
			uni.setNavigationBarColor({
				frontColor:"#FFFFFF",
				backgroundColor:"#000000"
			})
		},
		created() {
			this.getDetailData()
		},
		methods:{
			// 获取详情数据
			getDetailData(){
				this.detailData=require('../../static/mock/detail.json')
				// 设置标题
				uni.setNavigationBarTitle({
					title:this.detailData.title
				})
			},
			// 图片预览
			previwImg(flag,index){
				uni.previewImage({
					urls:flag=='photos'?this.detailData[flag].map(v=>this.$img(v.thumb)):this.detailData[flag].map(v=>this.$img(v.avatars.small)),
					current:index,
					loop:true
				})
				
			},
			// 显示与隐藏封面图
			toCover(flag){
				this.showCover=flag
				if(flag){
					this.videoCtx.pause()
					// #ifdef APP-PLUS
					this.showVideo=false
					// #endif
				}else{
					// #ifdef APP-PLUS
					this.showVideo=true
					// #endif
					this.videoCtx.play()
				}
			},
			// #ifdef APP-PLUS
			// 获取已播放视频的时长
			getVideoUpdate(e){
				this.currentTime=e.detail.currentTime
			},
			// #endif
		},
		// 设置分享-转发
		onShareAppMessage(res) {
			return{
				title:this.detailData.title,
				path:"/pages/detail/detail",
				imageUrl:this.$img(this.detailData.images.small),
				success:res=>{
					uni.showToast({
						title:'分享成功'
					})
				},
				fail:err=>{
					uni.showToast({
						title:'分享失败！',
						icon:'none'
					})
				}
			}
		},
		// 分享到朋友圈
		onShareTimeline() {
			return{}
		},
		// 监听导航栏自定义按钮
		onNavigationBarButtonTap(e) {
			const index=e.index
			if(index==0){ //分享
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 0,
				    href: "/pages/detail/detail",
				    title: this.detailData.title,
				    summary: this.detailData.summary,
				    imageUrl: this.$img(this.detailData.images.small),
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
			}
		},
		components:{trailerStar,Cover}
	}
</script>

<style lang="scss" scoped>
.movie_detail{
	.player{
		display: flex;
		align-items: center;
		flex-direction: column;
		width: 100%;
		height: 440upx;
		background-color: #000;
		video{
			width: 100%;
			height: 100%;
		}
	}
	.movie_info{
		display: flex;
		flex-direction: row;
		padding: 40upx 20upx;
		.movie_cover{
			width: 280upx;
			height: 380upx;
		}
		.moive_desc{
			display: flex;
			flex-direction: column;
			margin-left: 30upx;
			width: 400upx;
			.movie_title{
				color: #000;
				font-size: 30px;
				font-weight: 700;
			}
			.movie_base_info{
				color: darkgray;
				font-size: 13px;
				line-height: 36upx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.movie_score_wrapper{
				width: 360upx;
				height: 90upx;
				padding: 20upx;
				margin-top: 20upx;
				background-color: #fff;
				box-shadow: 3px 2px 10px #dedede;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				.big_score{
					.score_words{
						font-size: 12px;
						color: grey;
					}
					.movie_score{
						color: #feab2a;
						font-size: 26px;
						font-weight: 700;
						line-height: 60upx;
						margin-left: 8upx;
					}
				}
				.score_stars{
					.prise_counts{
						font-size: 12px;
						color: grey;
						line-height: 44upx;
					}
				}
			}
		}
	}
	.line_wrapper{
		padding: 0 20upx;
		.line{
			height: 1px;
			background-color: #dbdbdb;
		}
	}
	.plots_block{
		padding: 20upx 40upx;
		.plots_title{
			color: #a9a9a9;
			font-size: 14px;
		}
		.plots_desc{
			color: #353535;
			text-indent: 2em;
			margin-top: 10upx;
			font-size: 16px;
		}
	}
	.scroll_block{
		padding: 20upx 40upx;
		.scroll_list{
			width: 100%;
			margin-top: 20upx;
			white-space: nowrap;
			.plots_img{
				width: 220upx;
				height: 320upx;
				margin-right: 10upx;
			}
			.actor_wrapper{
				display: inline-block;
				.actor_img{
					width: 170upx;
					height: 240upx;
					margin-right: 10upx;
				}
				.actor_name,.actor_role{
					width: 170upx;
					text-align: center;
					font-size: 15px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.actor_role{
					color: #a9a9a9;
					font-size: 13px;
				}
			}
		}
	}
}
// 样式穿透-评分组件
.score_stars /deep/ .movie_score_wrapper{
	justify-content:start;
}
</style>