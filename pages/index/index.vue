<!--首页-->
<template>
	<view class="page">
		<!--circular轮播 interval间隔播放时间8s 切换图片花费时间1s-->
		<swiper circular="true" interval="8000" duration="1000" class="swiper">
			<swiper-item><image mode="widthFix" src="https://emos-1304556315.cos.ap-nanjing.myqcloud.com/img/banner/swiper-1.jpg"></image></swiper-item>
			<swiper-item><image mode="widthFix" src="https://emos-1304556315.cos.ap-nanjing.myqcloud.com/img/banner/swiper-2.jpg"></image></swiper-item>
			<swiper-item><image mode="widthFix" src="https://emos-1304556315.cos.ap-nanjing.myqcloud.com/img/banner/swiper-3.jpg"></image></swiper-item>
			<swiper-item><image mode="widthFix" src="https://emos-1304556315.cos.ap-nanjing.myqcloud.com/img/banner/swiper-4.jpg"></image></swiper-item>
			<swiper-item><image mode="widthFix" src="https://emos-1304556315.cos.ap-nanjing.myqcloud.com/img/banner/swiper-5.jpg"></image></swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
		
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	@import url('index.less');
</style>
