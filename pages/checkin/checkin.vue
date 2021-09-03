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
	var QQMapWX=require('../../lib/qqmap-wx-jssdk.min.js');
	var qqmapsdk;
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
		onLoad:function(){
			qqmapsdk=new QQMapWX({
				key:"JIHBZ-MC56J-KVZFW-KIN5D-A3DXS-YEFVR"
			})
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
				else{//写签到的逻辑
					uni.showLoading({
						title:"签到中请稍后"
					})
					setTimeout(function(){
						uni.hideLoading()//定时器 设置30秒后消失 将弹出信息隐藏
					},3000)

					uni.getLocation({
						type:"wgs84",//属性
						success:function(resp){
							let latitude=resp.latitude//获取经度数据
							let longitude=resp.longitude//获取经度数据
							console.log("获取经度数据 "+latitude)
							console.log("获取经度数据 "+longitude)
							qqmapsdk.reverseGeocoder({
								location:{
									latitude:latitude,
									longitude:longitude
								},
								success:function(resp){
									console.log(resp.result)
									let address=resp.result.address
									let addressComponent=resp.result.address_component
									let nation = addressComponent.nation;
									let province = addressComponent.province;
									let city = addressComponent.city;
									let district = addressComponent.district;
									uni.uploadFile({
										url:that.url.checkin,
										filePath:that.photoPath,
										name:"photo",
										header:{
											token:uni.getStorageSync("token")
										},
										formData:{
											address:address,
											country:nation,
											province:province,
											city:city,
											district:district
										},
										success:function(resp){
											if(resp.statusCode==500&&resp.data=="不存在人脸模型"){
												uni.hideLoading()
												uni.showModal({
													title:"提示信息",
													content:"EMOS系统中不存在你的人脸识别模型，是否用当前这张照片作为人脸识别模型？",
													success:function(res){
														if(res.confirm){
															console.info("成功 "+resp.data);

															uni.uploadFile({
																url:that.url.createFaceModel,
																filePath:that.photoPath,
																name:"photo",
																header:{
																	token:uni.getStorageSync("token")
																},
																success:function(resp){
																	if(resp.statusCode==500){
																		uni.showToast({
																			title:resp.data,
																			icon:"none"
																		})
																	}
																	else if(resp.statusCode==200){
																		uni.showToast({
																			title:"人脸建模成功",
																			icon:"none"
																		})
																	}
																}
															})
														}
													},
													fail:function(resp){
														console.info("失败 "+resp.data);
													}
												})
											}
											else if(resp.statusCode==200){
												let data=JSON.parse(resp.data)
												let code=data.code
												let msg=data.msg
												if(code==200){
													uni.hideLoading()
													uni.showToast({
														title:"签到成功",
														complete:function(){
															//签到成功 跳转至其他页面
														}
													})
												}
											}
											else if(resp.statusCode==500){
												uni.showToast({
													title:resp.data,
													icon:"none"
												})
											}
										}
									})
								}
							})
						},

					})

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

