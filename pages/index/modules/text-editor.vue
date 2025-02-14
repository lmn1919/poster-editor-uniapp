<template>
  <view class="safe-area-inset-bottom text-handle-bar">
    <uni-popup ref="popup" background-color="#fff" mask-background-color="rgba(0,0,0,0)">
      <view class="handle-box-content">
        <view class="tab-bar">
          <!-- <view class="handle-item handle-item-active"  @click="handleType('text')">
             <text class="iconfont icon-pingtaineirongguanli"></text>
            <text class="handle-name">内容</text>
          </view>
          <view class="handle-item">
            <text class="iconfont icon-color_lens-o"></text>
            <text class="handle-name">颜色</text>
          </view>
          <view class="handle-item">
            <text class="iconfont icon-liebiaoyangshi4"></text>
            <text class="handle-name">样式</text>
          </view> -->
          <view
            class="handle-item"
            v-for="(item, index) in handleTypeList"
            :key="index"
            @click="handleShowActionPopup('textEditor')"
            :class="{'handle-item-active':item.key==activeKey}"
          >
            <text class="iconfont" :class="item.icon"></text>
            <text class="handle-name">{{ item.name }}</text>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      handleTypeList: [
        { name: "内容", icon: "icon-wenzi icon-pingtaineirongguanli", key: 1 },
        { name: "颜色", icon: "icon-color_lens-o", key: 2 },
        { name: "样式", icon: "icon-liebiaoyangshi4", key: 3 },
      ],
      activeKey:1
    };
  },
  mounted() {
    this.handleShow();
  },
  methods: {
    handleShow() {
      // alert('暂时66666')
      this.$refs.popup.open("bottom");
    },
  },
};
</script>

<style>
.handle-box-content {
  /* padding: 24rpx; */
}
.tab-bar {
  background: #f6f7fb;
  height: 100rpx;
  display: flex;
  justify-content: space-around;
  color: #616469;
}
.handle-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.handle-item-active {
  color: #2079ed !important;
}

.iconfont {
  font-size: 44rpx;
  /* color: #333; */
}
.icon-liebiaoyangshi4 {
  font-size: 40rpx;
}
.handle-name {
  font-size: 20rpx;
}
.safe-area-inset-bottom {
  padding-bottom: 0 !important;
  padding-bottom: constant(safe-area-inset-bottom) !important;
  padding-bottom: env(safe-area-inset-bottom) !important;
}
</style>
