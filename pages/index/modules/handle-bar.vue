<template>
  <view class="handle-bar-content safe-area-inset-bottom">
	<view class="handle-bar">
		 <view class="handle-item">
			<image src="../../../static/image/text-icon.png"></image>
			<text class="handle-name">文字</text>
		 </view>
		 <view class="handle-item">
		 	<image src="../../../static/image/image-icon.png"></image>
		 	<text class="handle-name">图片</text>
		 </view>
		 <view class="handle-item">
		 	<image src="../../../static/image/material-icon.png"></image>
		 	<text class="handle-name">素材</text>
		 </view>
		 <view class="handle-item">
		 	<image src="../../../static/image/size-icon.png"></image>
		 	<text class="handle-name">尺寸</text>
		 </view>
	</view>  
  </view>
</template>

<script>
export default {
  components: {},

  data() {
    return {
		// handleTypeList:[
		// 	{name:'文字',icon:require('../../../static/image/image-icon.png'),key:1},
		// 	{name:'图片',icon:'../../../static/image/image-icon.png',key:2},
		// 	{name:'尺寸',icon:'../../../static/image/size-icon.png',key:3}
		// ]
	};
  },
  onLoad() {},
  methods: {},
};
</script>

<style>
.handle-bar-content {

  position: fixed;
  bottom: 0;
  width: 100%;

}
  .handle-bar{
	 background: #0e1118;
	 height: 100rpx; 
	 display: flex;
	 justify-content: space-around;
  }
  .handle-item{
  	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
  }
  .handle-item image{
     height: 40rpx;
     width: 40rpx;
	 margin-bottom: 5rpx;
  }
  .handle-name{
	  color: #616469;
	  font-size: 20rpx;
  }
.safe-area-inset-bottom {
	padding-bottom: 0 !important;
	padding-bottom: constant(safe-area-inset-bottom) !important;
	padding-bottom: env(safe-area-inset-bottom) !important;
}
</style>
