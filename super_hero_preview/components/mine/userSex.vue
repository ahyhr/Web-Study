<template>
<view class="page sex">
		<form @submit="formSubmitSex">
			<view class="page_block">
				<view class="radio_wrapper">
					<radio-group name="sex" class="radio_sex" @change="changeSex">
						<label class="radio_single">
							<radio value="1" :checked="sex==1"/><text>男</text>
						</label>
						<label class="radio_single">
							<radio value="0" :checked="sex==0"/><text>女</text>
						</label>
						<label class="radio_single">
							<radio value="-1" :checked="sex==-1"/><text>保密</text>
						</label>
					</radio-group>
				</view>
			</view>
			<button type="primary" form-type="submit" class="submit_btn">确定</button>
		</form>
		<view class="" @click="$emit('forCanel')">
			<Canel />
		</view>
	</view>
</template>

<script>
	import Canel from '../common/canel.vue'
	export default{
		data(){
			return{
				sex:-1,
			}
		},
		created(){
			this.sex=uni.getStorageSync('userInfo').sex
		},
		methods:{
			changeSex(e){
				this.sex=e.detail.value
			},
			formSubmitSex(){
				this.getLocal('userInfo','sex',this.sex)
				this.$emit('forCanel')
			}
		},
		components:{Canel}
	}
</script>

<style scoped lang="scss">
	.sex{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
	}
	.page_block{
		margin-top: 100upx;
	}
	.radio_wrapper{
		padding: 40upx;
		background-color: #fff;
	}
	.radio_single{
		padding: 10upx 18upx;
	}
	.submit_btn{
		width: 95%;
		margin-top: 40upx;
	}
</style>
