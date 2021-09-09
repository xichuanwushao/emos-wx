<template>
	<view class="page">
			<uni-list><!-- title标题  note消息内容 avatar头像 badgePositon小红球位置左 badgeText是否显示小红球 dot小红球 link点击跳转页面-->
				<uni-list-chat v-for="one in list" :key="one.id" :title="one.senderName"
					:note="one.msg" :avatar="one.senderPhoto" badgePositon="left"
					:badgeText="one.readFlag?'':'dot'" link="navigateTo"
					:to="'../message/message?id=' + one.id + '&readFlag=' + one.readFlag + '&refId=' + one.refId">
					<view class="chat-custom-right">
						<text class="chat-custom-text">{{one.sendTime}}</text>
					</view>
				</uni-list-chat>
			</uni-list>
		</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue';
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue';

	export default {
		components:{
			uniList,
			uniListItem
			},
		data() {
			return {
				page:1,
				length:20,
				list:[{
					 id: "87737874656661504",
					 refId:"89995738783813632",
					 senderName:"系统消息",
					 senderPhoto:"https://thirdwx.qlogo.cn/mmopen/vi_32/mJQ68h2NfxXIm62ibSB9X8dRM8NCTZvFsW9Cv34B2pwKGJuylOn11picMDCgFsjxGiaWq71xTZia1uCfatDAWr2U5g/132",
					 msg:"HelloWorld",
					 readFlag:false,
					 sendTime: "2021-01-23 17:21:30"
				}],
				isLastPage:false
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	@import url("message_list.less");
</style>
