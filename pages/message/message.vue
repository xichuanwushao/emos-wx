<template>
	<view class="page">
		<view class="message">
			<view class="header">
				<view class="desc">{{sendTime}}</view>
				<view class="opt" @tap="deleteMsg()">删除</view>
			</view>
			<view class="content">{{msg}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
