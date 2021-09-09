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
		<view class="notify-container"   @tap="toPage('消息提醒', '/pages/message_list/message_list')"  >
			<view class="notify-title"><!--widthFix 长宽比不变化-->
				<image src="../../static/icon-1.png" mode="widthFix" class="notify-icon"></image>
				消息提醒
			</view>
			<view class="notify-content">你有{{ unreadRows }}条未读消息</view>
			<image src="../../static/icon-2.png" mode="widthFix" class="more-icon"></image>
		</view>
		<view class="nav-container">
			<view class="nav-row">
				<view class="nav"    @tap="toPage('在线签到', '../checkin/checkin')"   >
					<image mode="widthFix" src="../../static/nav-1.png" class="icon"></image>
					<text class="name">在线签到</text>
				</view>
				<view class="nav">
					<image src="../../static/nav-2.png" mode="widthFix" class="icon"></image>
					<text class="name">员工健康</text>
				</view>
				<view class="nav">
					<image src="../../static/nav-3.png" mode="widthFix" class="icon"></image>
					<text class="name">在线请假</text>
				</view>
				<view class="nav">
					<image src="../../static/nav-4.png" mode="widthFix" class="icon"></image>
					<text class="name">公务出差</text>
				</view>
			</view>
			<view class="nav-row">
				<view class="nav">
					<image src="../../static/nav-5.png" mode="widthFix" class="icon"></image>
					<text class="name">员工日报</text>
				</view>
				<view class="nav">
					<image src="../../static/nav-6.png" mode="widthFix" class="icon"></image>
					<text class="name">我的加班</text>
				</view>
				<view class="nav">
					<image src="../../static/nav-7.png" mode="widthFix" class="icon"></image>
					<text class="name">付款申请</text>
				</view>
				<view class="nav">
					<image src="../../static/nav-8.png" mode="widthFix" class="icon"></image>
					<text class="name">费用报销</text>
				</view>
			</view>
			<view class="nav-row">
				<view class="nav">
					<image src="../../static/nav-9.png" mode="widthFix" class="icon"></image>
					<text class="name">公告通知</text>
				</view>
				<view class="nav" @tap="toPage('在线审批', '../approval_list/approval_list')">
					<image src="../../static/nav-10.png" mode="widthFix" class="icon"></image>
					<text class="name">在线审批</text>
				</view>
				<view class="nav">
					<image src="../../static/nav-11.png" mode="widthFix" class="icon"></image>
					<text class="name">物品领用</text>
				</view>
				<view class="nav">
					<image src="../../static/nav-12.png" mode="widthFix" class="icon"></image>
					<text class="name">采购申请</text>
				</view>
			</view>
		</view>
		<uni-popup ref="popupMsg" type="top">
			<uni-popup-message type="success" :message="'接收到' + lastRows + '条消息'" :duration="2000"/>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue';
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';

	export default {
		components: {
				uniPopup,
				uniPopupMessage,
				uniPopupDialog,
			},
		data() {
				return {
					unreadRows: 0,
					lastRows: 0,
					timer: null,
					calendar: [],
					meetingPage: 1,
					meetingLength: 20,
					meetingList: [],
					isMeetingLastPage: false
				};
			},
		onLoad: function() {
			let that = this;
			uni.$on('showMessage', function() {
				that.$refs.popupMsg.open();
			});
			that.ajax(that.url.refreshMessage, 'GET', null, function(resp) {
				that.unreadRows = resp.data.unreadRows;
				that.lastRows = resp.data.lastRows;
				if (that.lastRows > 0) {
					uni.$emit('showMessage');
				}
			});
		},
		onUnload: function() {
			uni.$off('showMessage');
		},
		onShow: function() {
			let that = this;
			that.timer = setInterval(function() {
				that.ajax(that.url.refreshMessage, 'GET', null, function(resp) {
					that.unreadRows = resp.data.unreadRows;
					that.lastRows = resp.data.lastRows;
					if (that.lastRows > 0) {
						uni.$emit('showMessage');
					}
				});
			}, 5000);
			
		},
		onHide: function() {
			let that = this;
			clearInterval(that.timer);
		},
		methods: {
			toPage: function(name, url) {
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style lang="less">
@import url('index.less');
</style>
