<template>
	<view>
		<image src="../../static/logo-1.png" class="logo" mode="widthFix"></image>
		<view class="logo-title">EMOS企业在线办公系统</view>
		<view class="logo-subtitle">Ver 2050.2</view>
		<button class="login-btn" open-type="getUserInfo" @tap="login()">登陆系统</button>
		<view class="register-container">
			没有账号？
			<text class="register" @tap="toRegister()">立即注册</text>
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
			toRegister: function() {
						uni.navigateTo({
							url: '../register/register'
						});
			},
			login: function() {//申明login方法
				let that = this;//定义that变量
				uni.login({//获取临时授权字符串
					provider: 'weixin',//
					success: function(resp) {//success回调方法
						let code = resp.code;//从响应获取临时授权字符串
						let token = uni.getStorageSync('token');//发送ajax请求 把临时字符串传给后端
						that.ajax(that.url.login, 'POST', { code: code }, function(resp) {//全局路径 请求方式 提交数据 一个匿名函数有参数
							let permission = resp.data.permission;//获取权限列表
							uni.setStorageSync('permission', permission);//保存权限到Storage
							//TODO 跳转到登陆页面
							console.log("登录成功 ")
							//登陆成功后 跳转至首页
							uni.switchTab({
								url: '../index/index'
							});
						});
					},
					fail: function(e) {
						console.log("login执行异常 "+e)
						uni.showToast({
							icon: 'none',
							title: '执行异常'
						});
					}
				});
			}
		}
	}
</script>

<style lang="less">
	@import url('login.less');
</style>
