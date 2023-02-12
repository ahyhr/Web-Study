<template>
	<view class="page mine">
		<view class="header">
			<view v-if="userInfo.ID">
				<image :src="userInfo.avatar" mode="" class="face"></image>
			</view>
			<view v-else>
				<image src="../../static/icons/default-face.png" mode="" class="face"></image>
			</view>
			<view class="info_wrapper">
				<view v-if="userInfo.ID" class="info">
					<view class="nickname">
						{{userInfo.username}}
					</view>
					<view class="userid">
						ID：{{userInfo.ID}}
					</view>
				</view>
				<view v-else @click="toRegisterLogin" class="nickname">
					注册/登录
				</view>
			</view>
			<view v-if="userInfo.ID" class="set_wrapper">
				<image @click="userSetting" src="../../static/icons/settings.png" mode="" class="setting_icon"></image>
			</view>
		</view>
		<registerLogin v-if="showRegisterLogin" @forCanel="toCanel" />
		<userCenter v-if="showUserSetting" @forCanel="toCanel" />

	</view>
</template>

<script>
	import registerLogin from '../../components/mine/registerLogin'
	import userCenter from '../../components/mine/userCenter.vue'
	export default {
		data() {
			return {
				showRegisterLogin: false, //显示登录注册组件
				userInfo: {}, //用户信息
				showUserSetting: false //显示用户设置中心
			}
		},
		created() {
			this.getUserInfo()
		},
		methods: {
			// 登录注册
			toRegisterLogin() {
				this.showRegisterLogin = true
			},
			// 取消登录注册
			toCanel() {
				this.showRegisterLogin = false
				this.showUserSetting = false
				this.getUserInfo()
			},
			// 获取缓存中的信息
			getUserInfo() {
				uni.getStorage({
					key: 'userInfo',
					success: res => {
						this.userInfo = res.data
					},
					fail: () => {
						this.userInfo = {}
					}
				})
			},
			// 用户设置中心
			userSetting() {
				this.showUserSetting = true
			},
			// 点击格子
			handleItem(i) {
				uni.showModal({
					title: this.projectData[i].title,
					content: this.projectData[i].content,
					showCancel: false,
					confirmText: '关闭'
				})
			},
		},
		// 转发
		onShareAppMessage() {},
		// 分享到朋友圈
		onShareTimeline() {},
		components: {
			registerLogin,
			userCenter
		}
	}
</script>

<style lang="scss" scoped>
	.mine {
		width: 100%;

		.header {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			box-sizing: border-box;
			/* #ifdef MP */
			padding: 0 30upx 40upx 30upx;
			/* #endif */
			/* #ifndef MP */
			padding: 120upx 30upx 40upx 30upx;
			/* #endif */
			background: url(../../static/icons/bg.png) repeat;
			background-color: #ffd655;
			background-size: 300rpx;

			.face {
				width: 120upx;
				height: 120upx;
				border-radius: 50%;
				flex-shrink: 0;
			}

			.info_wrapper {
				width: 70%;
				margin-left: 40upx;
				display: flex;
				flex-direction: column;
				justify-content: center;

				.info {
					max-width: 70%;
				}

				.nickname {
					color: #6a5018;
					font-size: 18px;
					font-weight: 700;
					width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.userid {
					color: #a38e62;
					font-size: 14px;
					width: 100%;
					margin-top: 10upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			.set_wrapper {
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
				align-items: center;
				width: 15%;

				.setting_icon {
					width: 40upx;
					height: 40upx;
				}
			}
		}

		.tips {
			color: #dedede;
			font-size: 30px;
			text-align: center;
			padding: 40upx 0;
			letter-spacing: 10upx;
			text-shadow: 3upx 3upx 8upx #000;
			opacity: 0.32;
		}

		.main_nine_box {
			display: flex;
			flex-wrap: wrap;
			width: 80%;
			height: 80vw;
			margin: auto;
			padding: 0 30upx;

			.item_box {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				width: calc((100% - 10upx) / 3);
				height: calc((100% - 10upx) / 3);
				border: 1px solid #ccc;
				border-bottom: none;
				border-right: none;

				&:nth-child(3n) {
					border-right: 1px solid #ccc;
				}

				&:nth-child(n+7) {
					border-bottom: 1px solid #ccc;
				}

				.tag_title {
					color: #666;
					font-size: 14px;
					padding-top: 15upx;
				}

				.tag_icon {
					width: 60upx;
					height: 60upx;
				}
			}
		}
	}
</style>
