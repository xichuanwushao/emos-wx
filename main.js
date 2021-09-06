import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
//封装全局变量
let baseUrl = "http://127.0.0.1:8080/emos";
Vue.prototype.url={
	register:baseUrl+"/user/register",
	login: baseUrl + "/user/login",
	checkin: baseUrl + "/checkin/checkin",
	createFaceModel: baseUrl + "/checkin/createFaceModel",
	validCanCheckIn: baseUrl + "/checkin/validCanCheckIn",
	searchTodayCheckin: baseUrl + "/checkin/searchTodayCheckin",
	searchUserSummary: baseUrl + "/user/searchUserSummary",
	searchMonthCheckin: baseUrl + "/checkin/searchMonthCheckin",
}
//全局的权限验证函数
Vue.prototype.checkPermission = function(perms) {
	let permission = uni.getStorageSync("permission")
	let result = false
	for (let one of perms) {
		if (permission.indexOf(one) != -1) {
			result = true
			break
		}
	}
	return result
}

//全局方法名字 ajax 
// url 请求地址
// method 请求方式
// data 请求提交数据
// fun 匿名函数
Vue.prototype.ajax = function(url, method, data, fun) {
	uni.request({
		"url": url,
		"method": method,
		"header": {
			//请求头 值从本地store取 使用同步调用
			token: uni.getStorageSync("token")
		},
		"data": data,
		//写一个success回调 resp是响应
		success: function(resp) {
			//401用户没有登录 跳转登录页面
			if (resp.statusCode == 401) {
				uni.redirectTo({
					url: "/pages/login/login.vue"
				})
				//http的状态码statusCode和业务的状态码code
			} else if (resp.statusCode == 200 && resp.data.code == 200) {
				//取出响应的数据
				let data = resp.data
				//判断响是否包含某一属性 令牌
				if (data.hasOwnProperty("token")) {
					let token = data.token
					//将token保存到Storage 调用同步方法
					uni.setStorageSync("token", token)
				}
				//将参数传入的匿名函数执行一下 将响应对象作为参数传入匿名函数 
				//匿名函数从响应里面提取数据 显示在页面上面
				fun(resp)
			} else {
				//后端项目执行发现异常 返回异常后 移动端需要显示异常消息
				uni.showToast({
					icon: "none",//面包屑
					title: resp.data//面包屑内容
				})
			}
		},
	})
}
