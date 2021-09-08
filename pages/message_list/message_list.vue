<template>
	<view>
		
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
				list:[
					 id: "87737874656661504",
					 refId:"89995738783813632",
					 senderName:"Emos系统",
					 senderPhoto:"https://thirdwx.qlogo.cn/mmopen/vi_32/mJQ68h2NfxXIm62ibSB9X8dRM8NCTZvFsW9Cv34B2pwKGJuylOn11picMDCgFsjxGiaWq71xTZia1uCfatDAWr2U5g/132",
					 msg:"HelloWorld",
					 readFlag:false,
					 sendTime: "2021-01-23 17:21:30"
				],
				isLastPage:false
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
