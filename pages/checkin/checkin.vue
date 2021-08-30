<!--在线签到-->
<template>
	<view>
		<!--device-position前置摄像头 flash关闭闪光灯 摄像头打开失败触发回调函数@error showCamera规定Camera是否显示-->
		<camera device-position="front" flash="off" class="camera" @error="error" v-if="showCamera"></camera>
		<image mode="widthFix" class="image" :src="photoPath" v-if="showImage"></image>
		<view class="operate-container">
			<button type="primary" class="btn" @tap="clickBtn" :disabled="!canCheckin">{{btnText}}</button>
			<button type="warn" class="btn" @tap="afresh" :disabled="!canCheckin">重拍</button>
		</view>
		<view class="notice-container">
			<text class="notice">注意事项</text>
			<text class="desc">拍照签到的时候，必须要拍摄自己的正面照片，侧面照片会导致无法识别。另外，拍照的时候不要戴墨镜或者帽子，避免影响拍照签到的准确度。</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				canCheckin: true,
				photoPath: '',
				btnText: '拍照',
				showCamera: true,//默认显示camera
				showImage: false
			}
		},
		methods: {
			clickBtn:function(){
				let that=this;
				if(that.btnText=="拍照"){//判断按钮显示文字是不是拍照
					let ctx=uni.createCameraContext();//调用微信对象
					ctx.takePhoto({//开始拍照
						quality:"high",//拍照质量
						success:function(resp){//拍照成功后
							console.log(resp.tempImagePath)//拍照图片路径
							that.photoPath=resp.tempImagePath//保存图片路径
							that.showCamera=false//隐藏取景框
							that.showImage=true//显示照片
							that.btnText="签到"//按钮文字修改为签到
						}
					})
				}
				else{//按钮上显示文字为签到时候


				}
			},
			afresh:function(){//重拍按钮对于回调函数
				let that=this;//
				that.showCamera=true;//取景框显示出来
				that.showImage=false;//图片隐藏起来
				that.btnText="拍照"//按钮文字改为拍照
			}
		}
	}
</script>

<style lang="less">
	@import url("checkin.less");
</style>

