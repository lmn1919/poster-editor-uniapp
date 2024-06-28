<template>
	<view class="poster-content" :style="poster.css">
		<template v-for="(item,index) of poster.views">
			<template v-if="!item.views">
				<image :src="item.src" v-if="item.type=='image'" :mode="objectFitKV[item.css.objectFit]" :style="item.css" :key="index"></image>
				<text v-if="item.type=='text'" :style="item.css" :key="index">{{item.text}}</text> 
				<view v-if="item.type=='view'" :style="item.css" :key="index">{{item.text}}</view> 
			</template>
			
			<view v-else :style="item.css" :key="index">
				<template v-for="(itemChildren1,childrenIndex1) of item.views">
					<template v-if="!itemChildren1.views">
					    <image :src="itemChildren1.src" v-if="itemChildren1.type=='image'" :mode="objectFitKV[itemChildren1.css.objectFit]" :style="itemChildren1.css" :key="childrenIndex1"></image>
					    <text v-if="itemChildren1.type=='text'" :style="itemChildren1.css" :key="childrenIndex1">{{itemChildren1.text}}</text> 
						<view v-if="itemChildren1.type=='view'" :style="itemChildren1.css" :key="childrenIndex1">{{itemChildren1.text}}</view> 
					</template>
					
					<view v-else :style="itemChildren1.css" :key="childrenIndex1">
						<template v-for="(itemChildren2,childrenIndex2) of itemChildren1.views">
							<template v-if="!itemChildren2.views">
							    <image :src="itemChildren2.src" v-if="itemChildren2.type=='image'" :mode="objectFitKV[itemChildren2.css.objectFit]" :style="itemChildren2.css" :key="childrenIndex2"></image>
							    <text v-if="itemChildren2.type=='text'" :style="itemChildren2.css" :key="childrenIndex2">{{itemChildren2.text}}</text> 
								<view v-if="itemChildren2.type=='view'" :style="itemChildren2.css" :key="childrenIndex2">{{itemChildren2.text}}</view> 
								<text v-if="itemChildren2.type=='qrcode'" :style="itemChildren2.css" :key="childrenIndex2">二维码</text> 
							</template>
							
							<view v-else :style="itemChildren2.css" :key="childrenIndex2">
								
							</view>
							
						</template>	
					</view>
					
				</template>	
			</view>
			
		</template>	
	</view> 
</template>

<script>
	export default {
	  components: {},
	  props:{
		  poster:{
			  type:Object,
			  default:()=>{}
		  }
	  },
	
	  data() {
	    return {
		   objectFitKV:{
			   'cover':'aspectFill',//保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。
			   'contain':'aspectFit',//保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。
			   'none':'aspectFill',
			   'fill':'scaleToFill',//不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
		   }
		};
	  },
	  onLoad() {},
	  methods: {},
	};
</script>

<style>
</style>