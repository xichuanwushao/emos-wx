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
		<view class="result-container">
			<view class="left">
							<image src="../../static/icon-6.png" mode="widthFix" class="icon-timer"></image>
							<image src="../../static/icon-6.png" mode="widthFix" class="icon-timer"></image>
							<view class="line"></view>
			</view>
			<view class="right"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {//定义变量
					name:"王府井",
					photo:"https://thirdwx.qlogo.cn/mmopen/vi_32/mJQ68h2NfxXIm62ibSB9X8dRM8NCTZvFsW9Cv34B2pwKGJuylOn11picMDCgFsjxGiaWq71xTZia1uCfatDAWr2U5g/132",
					deptName:"管理部",
					address: "辽宁省大连市",
					status: "正常",
					risk: "中风险",
					checkinTime: "08:25",
					date: "2020年12月1日",
					attendanceTime: "08:30",
					closingTime: "17:30",
					checkinDays: 201,
					weekCheckin:[
					{type:"工作日",day:"周一", status:"缺勤"},
					{type:"工作日",day:"周二",status:"迟到"},
					{type:"工作日",day:"周三",status:"缺勤"},
					{type:"工作日",day:"周四",status:"正常"},
					{type:"工作日",day:"周五",status:"正常"},
					{type:"休息日",day:"周六",status:""},
					{type:"休息日",day:"周七",status:""}
					]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	@import url("checkin_result.less");
</style>

