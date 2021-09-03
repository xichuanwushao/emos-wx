<template>
	<view class="page">
		<view class="summary-container">
			<view class="user-info"><!--插值用户的基本信息 使用flex布局 水平排列-->
				<image :src="photo" mode="widthFix" class="photo"></image><!--放置头像-->
				<view class="info">
					<text class="username">{{name}}</text>
					<text class="dept">隶属部门：{{deptName==null?"":deptName}}</text>
				</view>
			</view>
			<view class="date">{{date}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {//定义变量
				
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	@import url("checkin_result.less");
</style>

