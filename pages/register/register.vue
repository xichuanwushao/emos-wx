<template>
	<view>
		<image src="../../static/logo-2.png"  mode="widthFix" class="logo"></image>
		<!--mode="widthFix" 图片等比例缩放-->
	    <!--v-model="register-code"文本框输入的值直接保存在register-code这个变量上面-->
		<view class="register-container">
			<input type="text" placeholder="输入你的邀请码" class="register-code"
			 maxlength="6" v-model="registerCode"/>
			<view class="register-desc">管理员创建员工证账号之后，你可以从你的个人邮箱中获得注册邀请码</view>
			<button class="register-btn" open-type="getUserInfo" @tap="register()">执行注册</button>
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


<style lang="less">
	@import url('register.less');
	//引入register.less样式文件
</style>
