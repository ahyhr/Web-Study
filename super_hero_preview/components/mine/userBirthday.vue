<template>
	<view class="page birthday">
		<form @submit="formSubmitBirthday">
			<view class="page_block">
				<picker mode="date" start="1970-01-01" :end="endTime" @change="setBirthday">
					<view class="date">{{birth}}</view>
				</picker>
			</view>
			<button type="primary" form-type="submit" class="submit_btn">确定</button>
		</form>
		<view @click="$emit('forCanel')">
			<Canel />
		</view>
	</view>
</template>

<script>
	import Canel from '../common/canel.vue'
	export default{
		props:{
			birthday:{
				type:String,
				default:'2020-05-20'
			}
		},
		data(){
			return{
				birth:this.birthday, //生日
				endTime:null, //当前年月日
			}
		},
		mounted() {
			// 设置结束时间为当前年月日
			const now=new Date()
			const y=now.getFullYear()
			const m=(now.getMonth()+1+'').padStart(2,0)
			const d=(now.getDate()+'').padStart(2,0)
			this.endTime=`${y}-${m}-${d}`
		},
		methods:{
			setBirthday(e){
				this.birth=e.detail.value.trim()
			},
			formSubmitBirthday(){
				if(!this.birth){
					uni.showToast({
						icon:'none',
						title:'生日不能为空！'
					})
					return false
				}
				this.getLocal('userInfo','birthday',this.birth)
				this.$emit('forCanel')
			},
		},
		components:{Canel}
	}
</script>

<style scoped>
	.birthday{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
	}
	.page_block{
		margin-top: 100upx;
	}
	.date{
		height: 80upx;
		padding: 20upx 0 0 20upx;
		background-color: #fff;
		line-height: 60upx;
	}
	.submit_btn{
		width: 95%;
		margin-top: 40upx;
	}
</style>
