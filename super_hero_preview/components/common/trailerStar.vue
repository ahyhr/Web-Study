<template>
	<view class="trailer_star">
		<view class="movie_score_wrapper">
			<image src="../../static/icons/star-yellow.png" mode="" class="star"
				v-for="ys in yellowScore"
			></image>
			<image src="../../static/icons/star-gray.png" mode="" class="star"
				v-for="gs in grayScore"
			></image>
			<view class="movie_score" v-if="showNum">
				{{innerScore}}
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			innerScore:{//外部传入的分数
				type:Number,
				default:0
			}, 
			showNum:{ //是否显示具体分数 1-显示 0-不显示
				type:Number,
				default:0
			}
		},
		data(){
			return{
				yellowScore:0,
				grayScore:5,
			}
		},
		created() {
			let tempScore=0
			if(this.innerScore){
				tempScore=this.innerScore
			}
			this.yellowScore=parseInt(tempScore/2)
			this.grayScore=5-this.yellowScore
		}
	}
</script>

<style lang="scss" scoped>
	.trailer_star{
		.movie_score_wrapper{
			display: flex;
			flex-direction: row;
			justify-content: center;
			.star{
				width: 20upx;
				height: 20upx;
				margin-top: 6upx;
			}
			.movie_score{
				color: gray;
				font-size: 12px;
				margin-left: 8upx;
			}
		}
	}
</style>
