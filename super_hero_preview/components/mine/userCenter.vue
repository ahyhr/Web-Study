<template>
	<view class="page user_center">
		<view class="page_block info_list">
			<view class="item_wrapper face_line_upbottom" @click="handleAvatar">
				<view class="info_words">头像</view>
				<view class="right_wrapper">
					<image :src="userInfo.avatar" mode="" class="face"></image>
					<view class="arrow_block">
						<image src="../../static/icons/left-gray-arrow.png" mode="" class="arrow"></image>
					</view>
				</view>
			</view>
			<view class="line_wrapper">
				<view class="line"></view>
			</view>
			<view class="item_wrapper face_line_upbottom" @click="handleName">
				<view class="info_words">昵称</view>
				<view class="right_wrapper">
					<text class="txt overflow">{{userInfo.username}}</text>
					<view class="arrow_block">
						<image src="../../static/icons/left-gray-arrow.png" mode="" class="arrow"></image>
					</view>
				</view>
			</view>
			<view class="line_wrapper">
				<view class="line"></view>
			</view>
			<view class="item_wrapper face_line_upbottom">
				<view class="info_words">ID</view>
				<view class="right_wrapper">
					<text class="txt info_id_txt overflow">{{userInfo.ID}}</text>
				</view>
			</view>
			<view class="line_wrapper">
				<view class="line"></view>
			</view>
			<view class="item_wrapper face_line_upbottom" @click="handleBirthday">
				<view class="info_words">生日</view>
				<view class="right_wrapper">
					<text class="txt overflow">{{userInfo.birthday}}</text>
					<view class="arrow_block">
						<image src="../../static/icons/left-gray-arrow.png" mode="" class="arrow"></image>
					</view>
				</view>
			</view>
			<view class="line_wrapper">
				<view class="line"></view>
			</view>
			<view class="item_wrapper face_line_upbottom" @click="handleSex">
				<view class="info_words">性别</view>
				<view class="right_wrapper">
					<text class="txt overflow">{{userInfo.sex==0?'女':(userInfo.sex>0?'男':'保密')}}</text>
					<view class="arrow_block">
						<image src="../../static/icons/left-gray-arrow.png" mode="" class="arrow"></image>
					</view>
				</view>
			</view>
			<view class="line_wrapper">
				<view class="line"></view>
			</view>
		</view>
		<view class="footer_wrapper">
			<view class="footer_words">
				<button type="primary" plain size="mini" @click="clearData">清理缓存</button>
			</view>
			<view class="line_wrapper">
				<view class="line"></view>
			</view>
			<view class="footer_words">
				<button type="warn" plain size="mini" @click="logout">退出登录</button>
			</view>
		</view>
		<view class="canel" @click="$emit('forCanel')">✕</view>
		<userAvatar v-if="showUserAvatar" :avatar="userInfo.avatar" @forCanel="toCanel"/>
		<userName v-if="showUserName" :name="userInfo.username" @forCanel="toCanel"/>
		<userBirthday v-if="showUserBirthday" :birthday="userInfo.birthday" @forCanel="toCanel"/>
		<userSex v-if="showUserSex" :birthday="userInfo.sex" @forCanel="toCanel"/>
	</view>
</template>

<script>
	// import choiceAvatar from './choiceAvatar.vue'
	import userAvatar from './avatarCrop.vue'
	import userName from './userName.vue'
	import userBirthday from './userBirthday.vue'
	import userSex from './userSex.vue'
	export default{
		data(){
			return{
				userInfo:{}, //用户信息
				showUserAvatar:false, //是否打开选择头像的框
				showUserName:false, //是否显示昵称修改的框
				showUserBirthday:false, //是否显示生日修改的框
				showUserSex:false, //是否显示性别修改的框
			}
		},
		created() {
			this.getLocalUserInfo()
		},
		methods:{
			// 清除数据-模拟
			clearData(){
				// #ifdef APP-PLUS
				uni.showModal({
					title:'确定清除应用缓存？',
					success:res=>{
						if(res.confirm){
							const that=this
							const os=plus.os.name
							if(os=='Android'){
								let main = plus.android.runtimeMainActivity();
								let sdRoot = main.getCacheDir();
								let files = plus.android.invoke(sdRoot, "listFiles");
								let len = files.length;
								for (let i = 0; i < len; i++) {
									let filePath = '' + files[i]; // 没有找到合适的方法获取路径，这样写可以转成文件路径  
									plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
										if (entry.isDirectory) {
											entry.removeRecursively(function(entry) { //递归删除其下的所有文件及子目录  
												uni.showToast({
													title: '清理成功'
												});
												that.getCache(); // 重新计算缓存  
											}, function(e) {
												console.log(e.message)
											});
										} else {
											entry.remove();
										}
									}, function(e) {
										console.log('文件路径读取失败')
									});
								}
							}else{ //ios
								plus.cache.clear(function(){
									uni.showToast({
										title:'清理成功'
									})
									that.getCache()
								})
							}
							
							this.getLocalUserInfo()
						}
					}
				})
				// #endif
				// #ifndef APP-PLUS
				uni.showToast({
					title:'清理成功'
				})
				// #endif
			},
			// 退出登录
			 logout(){
				uni.showModal({
					title:'退出当前账号？',
					success:res=>{
						if(res.confirm){
							uni.removeStorage({
								key:'userInfo',
								success:()=> {
									uni.showToast({
										icon:'none',
										title:'已退出！'
									})
									this.$emit('forCanel')
								}
							})
						}
					}
				})
			 },
			// 读取本地数据
			getLocalUserInfo(){
				uni.getStorage({
					key:'userInfo',
					success:res=>{
						this.userInfo=res.data
					},
					fail:()=>{
						this.userInfo={}
					}
				})
			},
			// 点击头像
			handleAvatar(){
				if(this.isLogin){
					uni.showActionSheet({
						itemList:['查看我的头像','从相册选择上传'],
						success:res=>{
							const index=res.tapIndex
							if(index==0){
								uni.previewImage({
									urls:[this.userInfo.avatar]
								})
							}
							if(index==1){
								this.showUserAvatar=true
							}
						}
					})
				}
			},
			// 点击昵称
			handleName(){
				if(this.isLogin){
					this.showUserName=true
				}
			},
			// 点击生日
			handleBirthday(){
				if(this.isLogin){
					this.showUserBirthday=true
				}
			},
			// 点击性别
			handleSex(){
				if(this.isLogin){
					this.showUserSex=true
				}
			},
			// 用户是否登录
			isLogin(){
				if(this.userInfo.ID){
					return true
				}else{
					uni.showToast({
						icon:'none',
						title:'当前未登录'
					})
					return false
				}
			},
			// 关闭各种框
			toCanel(){
				this.showUserAvatar=false
				this.showUserName=false
				this.showUserBirthday=false
				this.showUserSex=false
				this.getLocalUserInfo()
			},
			// 获取App缓存
			getCache(){
				const that=this
				plus.cache.calculate(function(szie){
					let sizeCache = parseInt(size);
						if (sizeCache == 0) {
							that.fileSizeString = "0B";
						} else if (sizeCache < 1024) {
							that.fileSizeString = sizeCache + "B";
						} else if (sizeCache < 1048576) {
							that.fileSizeString = (sizeCache / 1024).toFixed(2) + "KB";
						} else if (sizeCache < 1073741824) {
							that.fileSizeString = (sizeCache / 1048576).toFixed(2) + "MB";
						} else {
							that.fileSizeString = (sizeCache / 1073741824).toFixed(2) + "GB";
						}
				})
			},
		},
		components:{
			userAvatar,
			userName,
			userBirthday,
			userSex
		}
	}
</script>

<style lang="scss" scoped>
	.user_center{
		// width: 100%;
		// height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9;
		background: #fff;
		.info_list{
			padding: 0 40upx;
			margin-top: 120upx;
			.face_line_upbottom{
				margin-top: 20upx;
				padding: 20upx auto;
			}
			.item_wrapper{
				display: flex;
				justify-content: flex-start;
				.info_words,.txt{
					color: #333;
					font-size: 16px;
					width: 25%;
					line-height: 80upx;
				}
				.info_id_txt{
					color:#aaa;
					padding-right: 40upx;
				}
				.right_wrapper{
					width: 80%;
					display: flex;
					flex-direction: row;
					justify-content: flex-end;
					.face{
						width: 80upx;
						height: 80upx;
						border-radius: 50%;
					}
					.txt{
						width: 50%;
						text-align: right;
					}
					.arrow_block{
						margin-left: 10upx;
						line-height: 86upx;
						.arrow{
							width: 30upx;
							height: 30upx;
						}
					}
				}
			}
		}
		.footer_wrapper{
			position: fixed;
			/*#ifdef MP*/
			bottom: 0upx;
			/*#endif*/
			/*#ifndef MP*/
			bottom: 90upx;
			/*#endif*/
			width: 100%;
			display: flex;
			flex-direction: column;
			.footer_words{
				color: #333;
				font-size: 16px;
				text-align: center;
				padding: 10upx;
				background-color: #fff;
			}
		}
	}
	.line_wrapper{
		.line{
			width: 100%;
			height: 1px;
			background-color: #dbdbdb;
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
