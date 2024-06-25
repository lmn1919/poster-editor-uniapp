# df-movable
## 引入
import dfMoveable from "@/uni_modules/df-movable/components/df-movable/df-movable";

## 使用
	```
		见demo
	```
## 参数
x	//x坐标  
y //y坐标  
rotate //旋转角度  
scale //缩放  
parentScale //当前父盒子空间的缩放倍数（当受到父元素影响时使用）  
keys //如果有多个组件保持唯一性即可   
## 事件
@movableEnd //返回拖拽后的坐标等信息

## demo
//当前已测试平台h5 wx小程序
```
<template>
	<view class="consent">
		<df-moveable v-for="i in 3" :y="50" :x="50" :scale="0.8" :rotate="50" :keys="i" @moveableEnd="moveableEnd">
				<image  src="../../static/logo.png"></image>
		</df-moveable>
	</view>
</template>

<script>
	import dfMoveable from "@/uni_modules/df-movable/components/df-movable/df-movable";
	export default {
		components: {
			dfMoveable
		},
		methods:{
			moveableEnd(e){
				console.log('组件结束事件',e)
			}
		}
	}
</script>


```