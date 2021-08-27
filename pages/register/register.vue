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
			register:function(){
			    uni.login({
			       provider:"weixin",
			       success:function(resp){
			          console.log("用户临时授权字符串 "+resp.code)
					  let code = resp.code;
					  uni.getUserInfo({
					  	provider:"weixin",
						//console.log("获取用户账户基本信息 ")
						success:function(resp){//回调函数
							let nickName = resp.userInfo.nickName;//用户昵称
							let avatarUrl = resp.userInfo.avatarUrl;//用户头像地址
							console.log("用户昵称 ",nickName);
							console.log("用户头像地址 ",avatarUrl);
						}
					  })
				   }
			    })
			}
		}
	}
</script>


<style lang="less">
	@import url('register.less');
	//引入register.less样式文件
</style>
