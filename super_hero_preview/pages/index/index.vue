<template>
	<view class="page index">
		<!-- 轮播图 -->
		<swiper indicator-dots circular :autoplay="true" class="carousel">
			<swiper-item v-for="item in swiperList" :key="item.id">
				<image :src="item.image" mode="heightFix" class="swiper_img"></image>
			</swiper-item>
		</swiper>

		<view class="tag" v-for="(tag,i) in tagList" :key="i">
			<Tag :imgSrc='tag.imgSrc' :hotTitle='tag.hotTitle' />
			<!-- 热门超英 -->
			<scroll-view v-if="i==0" scroll-x="true" class="page_block hot_scroll" @scrolltolower="scrollRightEnd">
				<view class="single_wrapper" v-for="item in hotData" :key="item.id" @click="toDetail">
					<view class="poster_wrapper">
						<image :src="item.images.small" mode="" class="poster"></image>
						<view class="movie_name">
							{{item.title}}
						</view>
						<!-- 评分组件 -->
						<trailerStar :innerScore="item.rating.average" :showNum="1" />
					</view>
				</view>
			</scroll-view>
			<!-- 热门预告 -->
			<view v-if="i==1" class="hot_movies page_block">
				<video :src="hotTrailerList[3].src" object-fit="fill" controls class="video"
					v-for="trailer in hotTrailerList" :key="trailer.id" :id="trailer.id"
					@play="videoPlay(trailer.id)"></video>
			</view>
			<!-- 猜你喜欢 -->
			<view v-if="i==2" class="guess">
				<view class="like_movie" v-for="(gitem,gindex) in guessData" :key="gitem.id">
					<image :src="gitem.images.small" mode="aspectFill" @click="toDetail" alt="icon" class="poster">
					</image>
					<view @click="toDetail" class="guess_desc">
						<view class="moive_title">{{gitem.title}}</view>
						<!-- 评分组件 -->
						<trailerStar :innerScore="gitem.rating.average" :showNum="0" />
						<view class="moive_info">
							{{gitem.mainland_pubdate}}
						</view>
						<view class="moive_info">
							<text v-for="(g,i) in gitem.genres" :key="i">{{g}}/</text>
						</view>
						<view class="moive_info">
							时长：{{gitem.durations[0]}}
						</view>
						<view class="moive_info">
							点赞数：{{gitem.collect_count}}
						</view>
					</view>
					<view class="guess_operation" @click="praise(gindex)">
						<image src="../../static/icons/praise.png" mode="" class="praise_icon"></image>
						<view class="praise_it">点赞</view>
						<view v-if="gindex === currentAnimation" :animation="animationData" class="animation">+1</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	// 标签组件：热门超英、热门预告、猜你喜欢
	import Tag from '../../components/index/Tag.vue'
	// 评分组件
	import trailerStar from '../../components/common/trailerStar.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				swiperList: [{
						"id": 1,
						"movieID": "",
						// 使用https://images.weserv.nl/?url=方式解决forbidden问题
						"image": "https://images.weserv.nl/?url=img1.doubanio.com/view/photo/l/public/p2410755737.webp",
						"sort": 1,
						"isShow": 1
					},
					{
						"id": 2,
						"movieID": "",
						"image": "https://images.weserv.nl/?url=//img3.doubanio.com/view/photo/l/public/p2556561071.webp",
						"sort": 1,
						"isShow": 1
					},
					{
						"id": 3,
						"movieID": "",
						"image": "https://images.weserv.nl/?url=img1.doubanio.com/view/photo/l/public/p2559849368.webp",
						"sort": 1,
						"isShow": 1
					},
					{
						"id": 4,
						"movieID": "",
						"image": "https://images.weserv.nl/?url=img3.doubanio.com/view/photo/l/public/p2432517600.webp",
						"sort": 1,
						"isShow": 1
					}
				],
				tagList: [{
					hotTitle: '热门超英',
					imgSrc: '../../static/icons/hot.png'
				}, {
					hotTitle: '热门预告',
					imgSrc: '../../static/icons/interest.png'
				}, {
					hotTitle: '猜你喜欢',
					imgSrc: '../../static/icons/guess-u-like.png'
				}],
				hotData: [], //热门超英数据
				hotCount: 10, //每次请求数据量
				// 热门预告
				hotTrailerList: [{
						id: '001',
						src: 'http://qo1xme9v6.hn-bkt.clouddn.com/JusticeLeague.mp4',
						poster: 'http://qo1xme9v6.hn-bkt.clouddn.com/JusticeLeague.jpg'
					},
					{
						id: '002',
						src: 'http://qo1xme9v6.hn-bkt.clouddn.com/The%20Falcon%20and%20the%20Winter%20Soldier.mp4',
						poster: 'http://qo1xme9v6.hn-bkt.clouddn.com/The%20Falcon%20and%20the%20Winter%20Soldier.jpg'
					},
					{
						id: '003',
						src: 'http://qo1xme9v6.hn-bkt.clouddn.com/trailer3.mp4',
						poster: 'http://qo1xme9v6.hn-bkt.clouddn.com/trailer3.jpg'
					},
					{
						id: '004',
						src: 'http://mdup.apdcdn.tc.qq.com/vcloud1022.tc.qq.com/1022_d35f9f934fa64fb7b1c2f225337cf55c.f0.mp4?vkey=EF84BEC7B073D830522ADCDC3936E4F97318D878FD5B75D24D2B83D465724F1E8FD7465E3D1053139E75BFCA0112DFB33FE3AA851730FAEA841047CDEEDBA726E6FEF84FC3AF0005F46ED2A5BCB107A5D3D8AFD06458E4CC&sha=0',
						poster: 'http://qo1xme9v6.hn-bkt.clouddn.com/nz.png'
					},
					// {
					// 	id:'005',
					// 	src:'http://mdup.apdcdn.tc.qq.com/vcloud1022.tc.qq.com/1022_17aca686afb74be18abd1564b5b76531.f0.mp4?vkey=7140DFB86F5FFA4578448010304D675C3D13CC0A2E4FE6A6C5D2208719444B60FE7A6794A4C9CD496B6BFF423D34CD6052F9D4C8B33271AB9E6CBE8AAC75791E0D1F311237909ED7379ADAF666BDA86EB7F0EBDDC339B6AF&sha=0',
					// 	poster:'http://qo1xme9v6.hn-bkt.clouddn.com/nz.png'
					// }
				],
				// 猜你喜欢
				guessData: [],
				guessCount: 5, //每次请求数据量
				// 动画
				animationData: [],
				currentAnimation: 0,
				// 视频上下文对象
				videoCtx: null,
				videoId: null
			}
		},
		onLoad() {
			// 模拟数据加载中
			uni.showLoading({
				mask: true,
				title: '加载中……'
			})
			setTimeout(() => {
				uni.hideLoading()
			}, 800)

			// 创建一个临时动画
			this.animation = uni.createAnimation()
		},
		onUnload() {
			// 页面卸载时清除动画
			this.animationData = {}
		},
		onHide() {
			if (this.videoCtx) {
				this.videoCtx.pause()
			}
		},
		created() {
			this.getHotData()
			this.getGuessData()
		},
		methods: {
			// 获取热门数据
			getHotData() {
				// 特别注意：非H5端不能用uni.request来请求本地json数据！！！
				// const dataRes=await this.$http({url:'/new_movies.json'})
				const {
					subjects: dataRes
				} = require('../../static/mock/top250.json')
				// 截取10条数据
				let newArr = []
				for (let i = 0; i < dataRes.length; i++) {
					if (i + this.hotCount - 10 < this.hotCount) {
						let item = dataRes[i + this.hotCount - 10]
						// 对图片做处理
						item.images.small = item.images.small.replace('https://', 'https://images.weserv.nl/?url=')
						newArr.push(item)
					}
				}
				this.hotData = [...this.hotData, ...newArr]
			},
			// 获取猜你喜欢数据
			getGuessData() {
				const {
					subjects: dataRes
				} = require('../../static/mock/weekly.json')
				// 截取5条数据，每次展示5条
				let newArr = []
				for (let i = 0; i < dataRes.length; i++) {
					if (i + this.guessCount - 5 < this.guessCount) {
						let item = dataRes[i + this.guessCount - 5].subject
						// 对图片做处理
						item.images.small = item.images.small.replace('https://', 'https://images.weserv.nl/?url=')
						newArr.push(item)
					}
				}
				this.guessData = newArr
			},
			// 向右滑动到终点
			scrollRightEnd() {
				if (this.hotCount == 50) {
					this.$show({
						icon: 'none',
						title: '没有更多数据了~'
					})
				} else {
					this.hotCount += 10 //再次请求10条数据
					this.getHotData()
				}

			},
			// 实现点赞动画效果
			praise(gindex) {
				this.currentAnimation = gindex
				// 开始动画
				this.animation.translateY(-60).opacity(1).step({
					duration: 400
				})
				this.animationData = this.animation.export()
				// 动画还原
				setTimeout(() => {
					this.animation.translateY(0).opacity(0).step({
						duration: 0
					})
					this.animationData = this.animation.export();
				}, 500)
			},
			// 视频播放
			videoPlay(id) {
				// 解决真机无限播放暂停问题
				if (this.videoId == id) {
					return false
				}
				this.videoCtx = uni.createVideoContext(id)
				// 确保只能有一个视频被播放，其它的暂停
				this.hotTrailerList.forEach(item => {
					if (item.id == id) {
						this.videoCtx.play()
						this.videoId = id
					} else {
						uni.createVideoContext(item.id).pause()
					}
				})
			},
			// 跳转到详情页-此处用一个固定的页面模拟
			toDetail() {
				uni.navigateTo({
					url: '../detail/detail',
				})
			},

		},
		onPullDownRefresh() { //下拉刷新，模拟切换数据
			if (this.guessCount == 10) {
				this.guessCount = 5
				this.getGuessData()
			} else {
				this.guessCount += 5
				this.getGuessData()
			}
			this.$show()
			uni.stopPullDownRefresh()
		},
		// 转发
		onShareAppMessage() {},
		// 分享到朋友圈
		onShareTimeline() {},
		components: {
			Tag,
			trailerStar
		}
	}
</script>

<style lang="scss" scoped>
	.index {
		.carousel {
			width: 100%;
			height: 440upx;

			.swiper_img {
				width: 100% !important;
				height: 100%;
			}
		}

		.hot_scroll {
			width: 100%;
			white-space: nowrap;

			.single_wrapper {
				display: inline-block;
				margin-left: 20upx;

				.poster_wrapper {
					display: flex;
					flex-direction: column;

					.poster {
						width: 200upx;
						height: 270upx;
					}

					.movie_name {
						width: 200upx;
						margin-top: 10upx;
						font-size: 14px;
						font-weight: 700;
						text-align: center;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}

		.hot_movies {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 0 20upx 20upx 20upx;

			.video {
				width: 350upx;
				height: 220upx;
				margin-top: 10upx;
			}
		}

		.guess {
			display: flex;
			flex-direction: column;

			.like_movie {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 30upx 20upx;

				/*#ifndef MP*/
				&:last-child {
					margin-bottom: 100upx;
				}

				/*#endif*/
				.poster {
					width: 180upx;
					height: 240upx;
					border-radius: 3%;
				}

				.guess_desc {
					display: flex;
					flex-direction: column;
					width: 340upx;

					.moive_title {
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.moive_info {
						color: #808080;
						font-size: 14px;
					}
				}

				.guess_operation {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					border-left: dashed 2px;
					border-left-color: #dbdbda;
					position: relative;
					width: 140upx;

					.praise_icon {
						width: 40upx;
						height: 40upx;
					}

					.praise_it {
						color: #feab2a;
						font-size: 14px;
					}

					.animation {
						color: #feab2a;
						font-size: 14px;
						position: absolute;
						bottom: 20%;
						opacity: 0;
					}
				}
			}
		}

		// 样式穿透-评分组件
		.guess_desc /deep/ .movie_score_wrapper {
			justify-content: start;
		}
	}
</style>
